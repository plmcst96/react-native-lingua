import asyncio
import logging
import os
import sys
from enum import Enum
from pathlib import Path
from typing import Any

from dotenv import load_dotenv
from google.genai import types
from vision_agents.core import Agent, AgentLauncher, Runner, User
from vision_agents.core.agents.conversation import Message, MessageState
from vision_agents.core.edge import Call
from vision_agents.plugins import gemini, getstream, openai

AGENT_DIR = Path(__file__).resolve().parent

# The LLM key lives in vision-agent/.env; the Stream keys are shared with the Expo app's root .env.
load_dotenv(AGENT_DIR / ".env")
load_dotenv(AGENT_DIR.parent / ".env")

logger = logging.getLogger(__name__)

DEFAULT_LANGUAGE = os.getenv("TEACHER_DEFAULT_LANGUAGE", "Spanish")
TEACHER_LLM = os.getenv("TEACHER_LLM", "gemini")
# Must match TEACHER_AGENT_USER_ID in src/server/visionAgent.ts; the Expo API adds this user as a call admin.
AGENT_USER_ID = "ai-teacher"

# Gemini's default turn detection is tuned for speed: it treats noise (or the teacher's own voice
# leaking into the mic) as speech and replies after 250 ms of silence. Learners pause a lot.
GEMINI_TURN_DETECTION = types.RealtimeInputConfigDict(
    turn_coverage=types.TurnCoverage.TURN_INCLUDES_ONLY_ACTIVITY,
    automatic_activity_detection=types.AutomaticActivityDetectionDict(
        start_of_speech_sensitivity=types.StartSensitivity.START_SENSITIVITY_LOW,
        end_of_speech_sensitivity=types.EndSensitivity.END_SENSITIVITY_LOW,
        prefix_padding_ms=200,
        silence_duration_ms=1200,
    ),
)

Lesson = dict[str, Any]

# Must match LIVE_CAPTION_EVENT in src/hooks/useLiveCaptions.ts.
LIVE_CAPTION_EVENT = "live_caption"
# Stream custom events are capped at 5KB; the end of a long turn is what's on screen anyway.
MAX_CAPTION_CHARS = 1000
# Must match LESSON_COMPLETED_EVENT in src/hooks/useLessonCompletion.ts.
LESSON_COMPLETED_EVENT = "lesson_completed"


# Must match the Rating type in src/types/learning.ts.
class Rating(str, Enum):
    EXCELLENT = "Excellent"
    GREAT = "Great"
    GOOD = "Good"
    KEEP_PRACTICING = "Keep practicing"


class LiveCaptionsConversation(getstream.Conversation):
    """Saves transcripts to Stream Chat like the default, and also sends every update to the
    call as a custom event so the app can show live captions for the teacher and the student."""

    def __init__(self, edge: getstream.Edge, *args: Any, **kwargs: Any):
        super().__init__(*args, **kwargs)
        self._edge = edge
        self._caption_lock = asyncio.Lock()
        self._caption_versions: dict[str, int] = {}

    async def _sync_to_backend(self, message: Message, state: MessageState, completed: bool):
        await super()._sync_to_backend(message, state, completed)
        if not message.id or not message.content:
            return

        caption = {
            "type": LIVE_CAPTION_EVENT,
            "id": message.id,
            "speaker": "teacher" if message.role == "assistant" else "student",
            "text": message.content[-MAX_CAPTION_CHARS:],
            "final": completed,
        }
        version = self._caption_versions.get(message.id, 0) + 1
        self._caption_versions[message.id] = version
        # Fire-and-forget like the chat sync, so sending captions never delays the teacher's audio.
        task = asyncio.create_task(self._send_caption(caption, version))
        self._pending_syncs.add(task)
        task.add_done_callback(self._pending_syncs.discard)

    async def _send_caption(self, caption: dict[str, Any], version: int):
        async with self._caption_lock:
            # Each caption holds the full text so far, so a queued older update can be skipped.
            if version < self._caption_versions[caption["id"]]:
                return
            try:
                await self._edge.send_custom_event(caption)
            except Exception:
                logger.warning("Could not send live caption", exc_info=True)


class LiveCaptionsEdge(getstream.Edge):
    async def create_conversation(self, call: Call, user: User, instructions: str):
        conversation = await super().create_conversation(call, user, instructions)
        self.conversation = LiveCaptionsConversation(self, instructions, [], conversation.channel)
        return self.conversation


def format_items(items: Any, text_key: str) -> str:
    if not isinstance(items, list) or not items:
        return "- (none)"

    lines = []
    for item in items:
        if not isinstance(item, dict) or not item.get(text_key):
            continue
        line = f"- {item[text_key]}"
        if item.get("pronunciation"):
            line += f" ({item['pronunciation']})"
        if item.get("translation"):
            line += f" = {item['translation']}"
        lines.append(line)
    return "\n".join(lines) or "- (none)"


def get_language_name(lesson: Lesson) -> str:
    language_name = lesson.get("languageName")
    return language_name if isinstance(language_name, str) and language_name else DEFAULT_LANGUAGE


def get_teacher_prompt(lesson: Lesson) -> dict[str, str]:
    teacher = lesson.get("aiTeacher")
    return teacher if isinstance(teacher, dict) else {}


def build_instructions(lesson: Lesson) -> str:
    language_name = get_language_name(lesson)
    teacher = get_teacher_prompt(lesson)

    return f"""
You are Lingo, a warm and upbeat {language_name} teacher in a live voice lesson. Sound like a
real person who loves teaching, not a textbook: short natural sentences, contractions, and a
friendly, energetic tone.

Today's lesson: {lesson.get("lessonTitle", "a beginner lesson")}
Lesson goal: {lesson.get("goal", "Learn a few useful words and phrases.")}
Scenario: {teacher.get("scenario", "A relaxed beginner class.")}
How to teach it: {teacher.get("instructions", "Teach the vocabulary, then practice the phrases.")}

Vocabulary to teach:
{format_items(lesson.get("vocabulary"), "word")}

Phrases to practice:
{format_items(lesson.get("phrases"), "text")}

This is a live conversation, not a lecture:
- Each turn does one small step, like one new word, one correction or one role-play line, and
  ends with a question or a clear prompt for the student. Then stop talking and wait.
- Never move on, answer for the student or pretend they replied. Your next step always depends
  on what the student actually said.
- React to their exact words. If they got it, cheer them on briefly and take the next step. If
  it was close, tell them which part to fix, say it slowly and ask them to try again. If you
  couldn't hear or understand them, ask them to say it again.
- Speak mostly English. Bring in one {language_name} word or phrase at a time: say it slowly
  and clearly, explain what it means in simple English, then ask the student to say it.
- Adapt to the student: slow down and break words into parts if they're unsure, move a little
  faster if they're confident, and use their own answers in the role-play.
- Keep every reply to one or two short conversational sentences.
- Encourage often and sincerely, like "Nice one!", "So close, try once more" or "That's it!".

Stay strictly inside this lesson:
- Only teach {language_name}, and only this lesson's goal, vocabulary, phrases and scenario.
  Don't add new words, grammar topics or any other language.
- If the student asks about something unrelated, kindly steer back to the lesson in one sentence.
- Never use emojis, markdown, lists or special characters, because everything you say is spoken aloud.

Finishing the lesson:
- Once the student has practiced every phrase above out loud at least once, call the
  complete_lesson tool exactly once with honest ratings of how they did.
- Never call it earlier, even if the student asks to finish.
- After calling it, congratulate the student in one or two sentences and say goodbye.
""".strip()


def build_kickoff(lesson: Lesson) -> str:
    opening_line = get_teacher_prompt(lesson).get("openingLine")
    if opening_line:
        return (
            "Start the lesson now. Say this opening line naturally, in your own friendly voice, "
            f"then stop and wait for the student to answer: {opening_line}"
        )
    return (
        "Start the lesson now. Greet the student warmly in English, introduce your first "
        f"{get_language_name(lesson)} word with its meaning, ask them to say it, then stop and wait."
    )


def create_llm():
    if TEACHER_LLM == "openai":
        # OpenAI's default semantic VAD already waits for the student to finish a thought.
        return openai.Realtime(send_video=False)
    return gemini.Realtime(config={"realtime_input_config": GEMINI_TURN_DETECTION})


async def create_agent(**kwargs) -> Agent:
    return Agent(
        edge=LiveCaptionsEdge(),
        agent_user=User(name="Lingo", id=AGENT_USER_ID),
        instructions=build_instructions({}),
        llm=create_llm(),
    )


async def join_call(agent: Agent, call_type: str, call_id: str, **kwargs) -> None:
    call = await agent.create_call(call_type, call_id)

    # The Expo API route stores the selected lesson in the call's custom data.
    response = await call.get() # type: ignore
    lesson: Lesson = response.data.call.custom or {}
    logger.info("Teaching %s in call %s:%s", lesson.get("lessonTitle"), call_type, call_id)

    # Normally the student's app has already gone live; this covers joining while still in backstage.
    if response.data.call.backstage:
        await call.go_live() # type: ignore

    # The realtime session reads its instructions and tools when it connects inside join().
    agent.llm.set_instructions(build_instructions(lesson))

    @agent.llm.register_function(
        description="Marks the lesson as completed and shows the student their ratings. "
        "Call it once, after the student has practiced every phrase of the lesson."
    )
    async def complete_lesson(speaking: Rating, pronunciation: Rating, grammar: Rating) -> dict:
        # The app saves the progress and XP when it receives this event.
        await agent.send_custom_event(
            {
                "type": LESSON_COMPLETED_EVENT,
                "lessonId": lesson.get("lessonId"),
                "scores": {
                    "speaking": Rating(speaking).value,
                    "pronunciation": Rating(pronunciation).value,
                    "grammar": Rating(grammar).value,
                },
            }
        )
        return {"completed": True}

    async with agent.join(call):
        await agent.simple_response(build_kickoff(lesson))
        await agent.finish()


if __name__ == "__main__":
    # Default to the HTTP server: the app starts the teacher, and `run` would open a browser demo instead.
    Runner(AgentLauncher(create_agent=create_agent, join_call=join_call)).cli(sys.argv[1:] or ["serve"])

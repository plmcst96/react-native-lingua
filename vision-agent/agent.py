import logging
import os
import sys
from pathlib import Path
from typing import Any

from dotenv import load_dotenv
from vision_agents.core import Agent, AgentLauncher, Runner, User
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

Lesson = dict[str, Any]


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
You are Lingo, a friendly AI language teacher in a voice-only lesson.

Always speak English. You are teaching {language_name}, and you teach it through English:
introduce {language_name} words and short phrases, say them clearly, translate them into
English, and ask the student to repeat them.

Today's lesson: {lesson.get("lessonTitle", "a beginner lesson")}
Lesson goal: {lesson.get("goal", "Learn a few useful words and phrases.")}
Scenario: {teacher.get("scenario", "A relaxed beginner class.")}
How to teach it: {teacher.get("instructions", "Teach the vocabulary, then practice the phrases.")}

Vocabulary to teach:
{format_items(lesson.get("vocabulary"), "word")}

Phrases to practice:
{format_items(lesson.get("phrases"), "text")}

Stay within this lesson's goal, vocabulary and phrases. Keep every reply to one or two short
sentences. Be warm and encouraging, gently correct mistakes, and never use emojis, markdown,
or special characters because everything you write is spoken aloud.
""".strip()


def build_kickoff(lesson: Lesson) -> str:
    opening_line = get_teacher_prompt(lesson).get("openingLine")
    if opening_line:
        return f"Greet the student and start the lesson with this opening line: {opening_line}"
    return f"Greet the student in English and teach them their first {get_language_name(lesson)} word."


def create_llm():
    if TEACHER_LLM == "openai":
        return openai.Realtime(send_video=False)
    return gemini.Realtime()


async def create_agent(**kwargs) -> Agent:
    return Agent(
        edge=getstream.Edge(),
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

    # The realtime session reads its instructions when it connects inside join().
    agent.llm.set_instructions(build_instructions(lesson))

    async with agent.join(call):
        await agent.simple_response(build_kickoff(lesson))
        await agent.finish()


if __name__ == "__main__":
    # Default to the HTTP server: the app starts the teacher, and `run` would open a browser demo instead.
    Runner(AgentLauncher(create_agent=create_agent, join_call=join_call)).cli(sys.argv[1:] or ["serve"])

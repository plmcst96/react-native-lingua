import { getLanguageByCode } from "@/data/languages";
import { getLessonById } from "@/data/lessons";
import { getClerkProfile, getSignedInUserId } from "@/server/clerk";
import { getStreamClient, LESSON_CALL_TYPE } from "@/server/stream";
import { TEACHER_AGENT_USER_ID } from "@/server/visionAgent";

type CreateCallBody = {
  lessonId?: string;
  languageCode?: string;
};

export async function POST(request: Request) {
  try {
    const userId = await getSignedInUserId(request);
    if (!userId) {
      return Response.json({ error: "You need to be signed in" }, { status: 401 });
    }

    const { lessonId, languageCode } = (await request.json()) as CreateCallBody;
    const lesson = lessonId ? getLessonById(lessonId) : undefined;
    if (!lesson || lesson.languageCode !== languageCode) {
      return Response.json({ error: "Unknown lesson for this language" }, { status: 400 });
    }

    const language = getLanguageByCode(lesson.languageCode);
    const profile = await getClerkProfile(userId);
    const stream = getStreamClient();

    // Call members must exist in Stream before the call is created.
    await stream.upsertUsers([
      { id: userId, name: profile.name, image: profile.image },
      { id: TEACHER_AGENT_USER_ID, name: "Lingo" },
    ]);

    // A fresh id per session, because an ended call can't be joined again.
    const callId = `${lesson.id}-${crypto.randomUUID().slice(0, 8)}`;
    await stream.video.call(LESSON_CALL_TYPE, callId).getOrCreate({
      data: {
        created_by_id: userId,
        members: [
          { user_id: userId, role: "host" },
          // In audio_room only hosts and admins may publish audio, so the teacher needs this role to speak.
          { user_id: TEACHER_AGENT_USER_ID, role: "admin" },
        ],
        // The Vision Agent reads this lesson context when it joins.
        custom: {
          lessonId: lesson.id,
          lessonTitle: lesson.title,
          languageCode: lesson.languageCode,
          languageName: language?.name,
          goal: lesson.goal,
          vocabulary: lesson.vocabulary,
          phrases: lesson.phrases,
          aiTeacher: lesson.aiTeacher,
        },
      },
    });

    return Response.json({ callType: LESSON_CALL_TYPE, callId });
  } catch (error) {
    console.error("[Stream] Call creation failed", error);
    return Response.json({ error: "Could not start the lesson call" }, { status: 500 });
  }
}

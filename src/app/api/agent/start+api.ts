import { getSignedInUserId } from "@/server/clerk";
import { isLessonCallOwner, LESSON_CALL_TYPE } from "@/server/stream";
import { startAgentSession, TEACHER_AGENT_USER_ID } from "@/server/visionAgent";

type StartAgentBody = {
  callId?: unknown;
};

export async function POST(request: Request) {
  try {
    const userId = await getSignedInUserId(request);
    if (!userId) {
      return Response.json({ error: "You need to be signed in" }, { status: 401 });
    }

    const { callId } = (await request.json()) as StartAgentBody;
    if (typeof callId !== "string" || !callId) {
      return Response.json({ error: "Missing callId" }, { status: 400 });
    }
    if (!(await isLessonCallOwner(callId, userId))) {
      return Response.json({ error: "This isn't your lesson call" }, { status: 403 });
    }

    const sessionId = await startAgentSession(LESSON_CALL_TYPE, callId);
    return Response.json({ callId, sessionId, agentUserId: TEACHER_AGENT_USER_ID });
  } catch (error) {
    console.error("[Agent] Start failed", error);
    return Response.json({ error: "Could not start the AI teacher" }, { status: 502 });
  }
}

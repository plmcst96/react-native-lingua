import { getSignedInUserId } from "@/server/clerk";
import { isLessonCallOwner } from "@/server/stream";
import { stopAgentSession } from "@/server/visionAgent";

type StopAgentBody = {
  callId?: unknown;
  sessionId?: unknown;
};

export async function POST(request: Request) {
  try {
    const userId = await getSignedInUserId(request);
    if (!userId) {
      return Response.json({ error: "You need to be signed in" }, { status: 401 });
    }

    const { callId, sessionId } = (await request.json()) as StopAgentBody;
    if (typeof callId !== "string" || typeof sessionId !== "string" || !callId || !sessionId) {
      return Response.json({ error: "Missing callId or sessionId" }, { status: 400 });
    }
    if (!(await isLessonCallOwner(callId, userId))) {
      return Response.json({ error: "This isn't your lesson call" }, { status: 403 });
    }

    await stopAgentSession(callId, sessionId);
    return Response.json({ stopped: true });
  } catch (error) {
    console.error("[Agent] Stop failed", error);
    return Response.json({ error: "Could not stop the AI teacher" }, { status: 502 });
  }
}

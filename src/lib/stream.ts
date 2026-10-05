import type { LanguageCode } from "@/types/learning";

// Clerk's useAuth().getToken; the API routes read the user from this session token.
type GetSessionToken = () => Promise<string | null>;

export type LessonCallInfo = {
  callType: string;
  callId: string;
};

async function fetchWithSession<T>(
  getSessionToken: GetSessionToken,
  path: string,
  init?: RequestInit,
): Promise<T> {
  const sessionToken = await getSessionToken();
  if (!sessionToken) {
    throw new Error("You need to be signed in");
  }

  const response = await fetch(path, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionToken}`,
    },
  });
  if (!response.ok) {
    throw new Error(`${path} failed with status ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export async function fetchStreamToken(getSessionToken: GetSessionToken) {
  const { token } = await fetchWithSession<{ token: string }>(getSessionToken, "/api/stream/token");
  return token;
}

export type TeacherAgentSession = {
  callId: string;
  sessionId: string;
  agentUserId: string;
};

export function startTeacherAgent(getSessionToken: GetSessionToken, callId: string) {
  return fetchWithSession<TeacherAgentSession>(getSessionToken, "/api/agent/start", {
    method: "POST",
    body: JSON.stringify({ callId }),
  });
}

export function stopTeacherAgent(getSessionToken: GetSessionToken, session: TeacherAgentSession) {
  return fetchWithSession<{ stopped: boolean }>(getSessionToken, "/api/agent/stop", {
    method: "POST",
    body: JSON.stringify({ callId: session.callId, sessionId: session.sessionId }),
  });
}

export function createLessonCall(
  getSessionToken: GetSessionToken,
  lesson: { lessonId: string; languageCode: LanguageCode },
) {
  return fetchWithSession<LessonCallInfo>(getSessionToken, "/api/stream/call", {
    method: "POST",
    body: JSON.stringify(lesson),
  });
}

// Must match the agent_user id in vision-agent/agent.py.
export const TEACHER_AGENT_USER_ID = "ai-teacher";

function getVisionAgentUrl() {
  return process.env.VISION_AGENT_URL ?? "http://127.0.0.1:8000";
}

export async function startAgentSession(callType: string, callId: string) {
  const response = await fetch(
    `${getVisionAgentUrl()}/calls/${encodeURIComponent(callId)}/sessions`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ call_type: callType }),
    },
  );
  if (!response.ok) {
    throw new Error(`Vision Agent server responded with ${response.status}`);
  }

  const { session_id } = (await response.json()) as { session_id: string };
  return session_id;
}

export async function stopAgentSession(callId: string, sessionId: string) {
  const response = await fetch(
    `${getVisionAgentUrl()}/calls/${encodeURIComponent(callId)}/sessions/${encodeURIComponent(sessionId)}`,
    { method: "DELETE" },
  );
  // 404 means the agent already left, e.g. because the call ended first.
  if (!response.ok && response.status !== 404) {
    throw new Error(`Vision Agent server responded with ${response.status}`);
  }
}

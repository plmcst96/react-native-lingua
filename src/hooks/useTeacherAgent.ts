import { useAuth } from "@clerk/expo";
import type { Call } from "@stream-io/video-react-native-sdk";
import { useCallback, useEffect, useRef, useState } from "react";

import { startTeacherAgent, stopTeacherAgent, type TeacherAgentSession } from "@/lib/stream";

export type TeacherAgentStatus = "idle" | "connecting" | "connected" | "failed";

type AgentPresence = "waiting" | "joined" | "left";

// The agent connects to its realtime LLM before joining, which can take a few seconds.
const JOIN_TIMEOUT_MS = 30_000;

// Sends the AI teacher into a live lesson call and removes it again on cleanup.
export function useTeacherAgent(call: Call | undefined, isCallLive: boolean) {
  const { getToken } = useAuth();
  const sessionRef = useRef<TeacherAgentSession | undefined>(undefined);
  const [session, setSession] = useState<TeacherAgentSession>();
  const [presence, setPresence] = useState<AgentPresence>("waiting");
  const [hasFailed, setHasFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);

  const stopAgent = useCallback(() => {
    const currentSession = sessionRef.current;
    if (!currentSession) return;
    sessionRef.current = undefined;
    stopTeacherAgent(getToken, currentSession).catch((error) =>
      console.error("[Agent] Stop failed", error),
    );
  }, [getToken]);

  useEffect(() => {
    if (!call || !isCallLive) {
      return;
    }

    const callId = call.id;
    let isCancelled = false;

    async function startAgent() {
      try {
        const newSession = await startTeacherAgent(getToken, callId);
        // The screen closed or the call ended while the request was in flight.
        if (isCancelled) {
          await stopTeacherAgent(getToken, newSession);
          return;
        }
        sessionRef.current = newSession;
        setSession(newSession);
      } catch (error) {
        console.error("[Agent] Could not start the AI teacher", error);
        if (!isCancelled) setHasFailed(true);
      }
    }

    startAgent();

    // Runs on unmount, when the call ends, and before a retry.
    return () => {
      isCancelled = true;
      stopAgent();
      setSession(undefined);
      setPresence("waiting");
      setHasFailed(false);
    };
  }, [call, isCallLive, getToken, stopAgent, attempt]);

  useEffect(() => {
    if (!call || !session) {
      return;
    }

    const subscription = call.state.participants$.subscribe((participants) => {
      const isInCall = participants.some(
        (participant) => participant.userId === session.agentUserId,
      );
      setPresence((current) => {
        if (isInCall) return "joined";
        return current === "joined" ? "left" : current;
      });
    });
    return () => subscription.unsubscribe();
  }, [call, session]);

  useEffect(() => {
    if (!session || presence !== "waiting") {
      return;
    }

    const timeout = setTimeout(() => setHasFailed(true), JOIN_TIMEOUT_MS);
    return () => clearTimeout(timeout);
  }, [session, presence]);

  function getStatus(): TeacherAgentStatus {
    if (!isCallLive) return "idle";
    if (presence === "joined") return "connected";
    if (hasFailed || presence === "left") return "failed";
    return "connecting";
  }

  function retryAgent() {
    setAttempt((current) => current + 1);
  }

  return {
    status: getStatus(),
    stopAgent,
    retryAgent,
  };
}

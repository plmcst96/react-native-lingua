import {
  type Call,
  CallingState,
  useStreamVideoClient,
} from "@stream-io/video-react-native-sdk";
import { useEffect, useState } from "react";

import { useSessionToken } from "@/hooks/useSessionToken";
import { createLessonCall } from "@/lib/stream";
import type { LanguageCode } from "@/types/learning";

export type LessonCallStatus = "loading" | "connecting" | "joined" | "error" | "ended";

// Starts an audio-only Stream call for a lesson and leaves it when the screen closes.
export function useLessonCall(lessonId: string | undefined, languageCode: LanguageCode | null) {
  const client = useStreamVideoClient();
  const getToken = useSessionToken();
  const [isClientConnected, setIsClientConnected] = useState(false);
  const [call, setCall] = useState<Call>();
  const [callingState, setCallingState] = useState<CallingState>();
  const [isMicOn, setIsMicOn] = useState(false);
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [hasGoneLive, setHasGoneLive] = useState(false);
  const [joinError, setJoinError] = useState<string>();
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!client) {
      return;
    }

    const subscription = client.state.connectedUser$.subscribe((user) =>
      setIsClientConnected(Boolean(user)),
    );
    return () => subscription.unsubscribe();
  }, [client]);

  useEffect(() => {
    // Joining before the client has its user token fails with "User token is not set".
    if (!client || !isClientConnected || !lessonId || !languageCode) {
      return;
    }

    const videoClient = client;
    const lesson = { lessonId, languageCode };
    let isCancelled = false;
    let lessonCall: Call | undefined;

    async function startCall() {
      try {
        const { callType, callId } = await createLessonCall(getToken, lesson);
        if (isCancelled) return;

        lessonCall = videoClient.call(callType, callId, { reuseInstance: true });
        setCall(lessonCall);
        await lessonCall.join();
        await lessonCall.microphone.enable();
        // audio_room calls start in backstage; going live lets other participants join.
        await lessonCall.goLive();
        if (!isCancelled) setHasGoneLive(true);
      } catch (error) {
        console.error("[Stream] Could not start the lesson call", error);
        if (!isCancelled) setJoinError("We couldn't connect you to your teacher.");
      }
    }

    startCall();

    return () => {
      isCancelled = true;
      if (lessonCall && lessonCall.state.callingState !== CallingState.LEFT) {
        lessonCall.leave().catch((error) => console.error("[Stream] Leave failed", error));
      }
      setCall(undefined);
      setHasGoneLive(false);
    };
  }, [client, isClientConnected, getToken, lessonId, languageCode, attempt]);

  useEffect(() => {
    if (!call) {
      return;
    }

    const subscriptions = [
      call.state.callingState$.subscribe(setCallingState),
      call.microphone.state.status$.subscribe((status) => setIsMicOn(status === "enabled")),
      call.state.localParticipant$.subscribe((participant) =>
        setIsUserSpeaking(Boolean(participant?.isSpeaking)),
      ),
    ];
    return () => {
      subscriptions.forEach((subscription) => subscription.unsubscribe());
      setIsUserSpeaking(false);
    };
  }, [call]);

  function getStatus(): LessonCallStatus {
    if (!client || joinError || callingState === CallingState.RECONNECTING_FAILED) return "error";
    if (callingState === CallingState.LEFT) return "ended";
    if (callingState === CallingState.JOINED) return "joined";
    return call ? "connecting" : "loading";
  }

  function getErrorMessage() {
    if (!client) return "Stream isn't set up. Add EXPO_PUBLIC_STREAM_API_KEY to your .env file.";
    if (callingState === CallingState.RECONNECTING_FAILED) return "The connection was lost.";
    return joinError;
  }

  async function toggleMic() {
    try {
      await call?.microphone.toggle();
    } catch (error) {
      console.error("[Stream] Mic toggle failed", error);
    }
  }

  async function endCall() {
    if (!call) return;
    try {
      await call.endCall();
    } catch (error) {
      console.error("[Stream] End call failed", error);
    }
    if (call.state.callingState !== CallingState.LEFT) {
      await call.leave().catch((error) => console.error("[Stream] Leave failed", error));
    }
  }

  // A new attempt re-runs the start effect, which leaves the old call first.
  function restartCall() {
    setJoinError(undefined);
    setCallingState(undefined);
    setIsMicOn(false);
    setAttempt((current) => current + 1);
  }

  const status = getStatus();

  return {
    call,
    status,
    // Stays true while reconnecting, so a network blip doesn't remove the teacher.
    isLive: hasGoneLive && (status === "joined" || status === "connecting"),
    errorMessage: getErrorMessage(),
    isMicOn,
    isUserSpeaking,
    toggleMic,
    endCall,
    restartCall,
  };
}

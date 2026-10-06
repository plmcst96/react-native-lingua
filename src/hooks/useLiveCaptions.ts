import type { Call } from "@stream-io/video-react-native-sdk";
import { useEffect, useState } from "react";

// Must match LIVE_CAPTION_EVENT in vision-agent/agent.py.
const LIVE_CAPTION_EVENT = "live_caption";

export type LiveCaption = {
  id: string;
  speaker: "teacher" | "student";
  text: string;
  isFinal: boolean;
};

function parseCaption(custom: Record<string, unknown>): LiveCaption | undefined {
  const { type, id, speaker, text, final } = custom;
  if (type !== LIVE_CAPTION_EVENT || typeof id !== "string" || typeof text !== "string") {
    return undefined;
  }
  if (speaker !== "teacher" && speaker !== "student") {
    return undefined;
  }
  return { id, speaker, text, isFinal: final === true };
}

// The AI teacher agent transcribes both sides of the lesson and sends each update as a call event.
// Returns only the line being spoken right now, like the newest message in a chat.
export function useLiveCaptions(call: Call | undefined) {
  const [caption, setCaption] = useState<LiveCaption>();

  useEffect(() => {
    if (!call) {
      return;
    }

    const pastLineIds = new Set<string>();
    let currentLineId: string | undefined;

    const unsubscribe = call.on("custom", (event) => {
      const update = parseCaption(event.custom);
      // A late update for an earlier line must not replace the newer one on screen.
      if (!update || pastLineIds.has(update.id)) return;

      if (currentLineId && currentLineId !== update.id) {
        pastLineIds.add(currentLineId);
      }
      currentLineId = update.id;
      setCaption(update);
    });

    return () => {
      unsubscribe();
      setCaption(undefined);
    };
  }, [call]);

  return caption;
}

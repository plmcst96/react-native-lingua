import { useUser } from "@clerk/expo";
import type { Call } from "@stream-io/video-react-native-sdk";
import { useEffect, useState } from "react";

import { useProgressStore } from "@/store/useProgressStore";
import type { LessonScores, Rating } from "@/types/learning";

// Must match LESSON_COMPLETED_EVENT in vision-agent/agent.py.
const LESSON_COMPLETED_EVENT = "lesson_completed";

const ratings: Rating[] = ["Excellent", "Great", "Good", "Keep practicing"];

function isRating(value: unknown): value is Rating {
  return ratings.includes(value as Rating);
}

function parseScores(custom: Record<string, unknown>, lessonId: string): LessonScores | undefined {
  if (custom.type !== LESSON_COMPLETED_EVENT || custom.lessonId !== lessonId) {
    return undefined;
  }
  const scores = custom.scores as Record<string, unknown> | undefined;
  if (!isRating(scores?.speaking) || !isRating(scores.pronunciation) || !isRating(scores.grammar)) {
    return undefined;
  }
  return { speaking: scores.speaking, pronunciation: scores.pronunciation, grammar: scores.grammar };
}

// The AI teacher decides when the lesson is done; this saves the progress and returns the scores.
export function useLessonCompletion(
  call: Call | undefined,
  lessonId: string | undefined,
  lessonXp: number,
) {
  const { user } = useUser();
  const userId = user?.id;
  const completeLesson = useProgressStore((state) => state.completeLesson);
  const [scores, setScores] = useState<LessonScores>();

  useEffect(() => {
    if (!call || !lessonId || !userId) {
      return;
    }

    // XP is awarded once per call, even if the teacher sends the event twice.
    let isSaved = false;

    const unsubscribe = call.on("custom", (event) => {
      const result = parseScores(event.custom, lessonId);
      if (!result) return;

      if (!isSaved) {
        isSaved = true;
        completeLesson(userId, lessonId, lessonXp);
      }
      setScores(result);
    });

    return () => {
      unsubscribe();
      setScores(undefined);
    };
  }, [call, lessonId, lessonXp, userId, completeLesson]);

  return scores;
}

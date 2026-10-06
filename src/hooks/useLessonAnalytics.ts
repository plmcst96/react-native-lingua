import { useEffect, useRef } from "react";

import { getLessonPath } from "@/data/lessons";
import type { LiveCaption } from "@/hooks/useLiveCaptions";
import { posthog } from "@/lib/posthog";
import type { Lesson } from "@/types/learning";

// Sends lesson_started on mount, and lesson_abandoned if the learner leaves before the teacher completes the lesson.
export function useLessonAnalytics(
  lesson: Lesson | undefined,
  caption: LiveCaption | undefined,
  isCompleted: boolean,
) {
  const startedAt = useRef(0);
  const completedRef = useRef(false);
  const teacherLineIds = useRef(new Set<string>());

  // The lesson is a conversation, so each new line from Lingo counts as the next question.
  useEffect(() => {
    if (caption?.speaker === "teacher") {
      teacherLineIds.current.add(caption.id);
    }
  }, [caption?.id, caption?.speaker]);

  // Stays true after a restart resets the scores, since the progress is already saved.
  useEffect(() => {
    if (isCompleted) {
      completedRef.current = true;
    }
  }, [isCompleted]);

  const lessonId = lesson?.id;
  const languageCode = lesson?.languageCode;

  useEffect(() => {
    if (!lessonId || !languageCode) {
      return;
    }

    const lineIds = teacherLineIds.current;
    startedAt.current = Date.now();
    completedRef.current = false;
    lineIds.clear();

    const lessonIndex = getLessonPath(languageCode).findIndex((item) => item.id === lessonId);
    posthog?.capture("lesson_started", {
      lesson_id: lessonId,
      language: languageCode,
      lesson_number: lessonIndex + 1,
    });

    return () => {
      if (completedRef.current) return;
      posthog?.capture("lesson_abandoned", {
        lesson_id: lessonId,
        time_into_lesson_seconds: Math.round((Date.now() - startedAt.current) / 1000),
        last_question_index: lineIds.size - 1,
      });
    };
  }, [lessonId, languageCode]);
}

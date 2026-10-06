import { useUser } from "@clerk/expo";

import { getLessonPath } from "@/data/lessons";
import { emptyProgress, getLocalDate, useProgressStore } from "@/store/useProgressStore";
import type { LanguageCode } from "@/types/learning";

export const DAILY_GOAL_XP = 20;

// The signed-in user's progress for one language, with stale daily values reset.
export function useProgress(languageCode: LanguageCode) {
  const { user } = useUser();
  const saved = useProgressStore((state) =>
    user ? state.progressByUser[user.id] : undefined,
  );
  const progress = saved ?? emptyProgress;
  const today = getLocalDate();

  // Lessons unlock in order, so count the completed ones from the start of the path.
  const path = getLessonPath(languageCode);
  const firstOpenIndex = path.findIndex(
    (lesson) => !progress.completedLessonIds.includes(lesson.id),
  );
  const completedLessonCount = firstOpenIndex === -1 ? path.length : firstOpenIndex;

  const studiedRecently =
    progress.lastStudyDate === today || progress.lastStudyDate === getLocalDate(-1);

  return {
    completedLessonCount,
    xpToday: progress.xpDate === today ? progress.xpToday : 0,
    dailyGoalXp: DAILY_GOAL_XP,
    // Missing a whole day breaks the streak, even before the next lesson is saved.
    streakDays: studiedRecently ? progress.streakDays : 0,
  };
}

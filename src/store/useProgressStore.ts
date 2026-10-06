import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type UserProgress = {
  completedLessonIds: string[];
  xpToday: number;
  xpDate: string | null; // the day xpToday belongs to, as YYYY-MM-DD
  streakDays: number;
  lastStudyDate: string | null;
};

type ProgressState = {
  // Keyed by Clerk user id, so each account on this device keeps its own progress.
  progressByUser: Record<string, UserProgress>;
  completeLesson: (userId: string, lessonId: string, xp: number) => void;
};

export const emptyProgress: UserProgress = {
  completedLessonIds: [],
  xpToday: 0,
  xpDate: null,
  streakDays: 0,
  lastStudyDate: null,
};

// The user's local calendar day, so streaks follow their own midnight.
export function getLocalDate(daysFromToday = 0) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromToday);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      progressByUser: {},
      completeLesson: (userId, lessonId, xp) =>
        set((state) => {
          const current = state.progressByUser[userId] ?? emptyProgress;
          const today = getLocalDate();

          let streakDays = 1;
          if (current.lastStudyDate === today) streakDays = current.streakDays;
          else if (current.lastStudyDate === getLocalDate(-1)) streakDays = current.streakDays + 1;

          const completedLessonIds = current.completedLessonIds.includes(lessonId)
            ? current.completedLessonIds
            : [...current.completedLessonIds, lessonId];

          return {
            progressByUser: {
              ...state.progressByUser,
              [userId]: {
                completedLessonIds,
                xpToday: (current.xpDate === today ? current.xpToday : 0) + xp,
                xpDate: today,
                streakDays,
                lastStudyDate: today,
              },
            },
          };
        }),
    }),
    {
      name: "progress-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

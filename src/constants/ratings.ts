import type { LessonScores, Rating } from "@/types/learning";

export const ratingColorClassNames: Record<Rating, string> = {
  Excellent: "text-[#43c13a]",
  Great: "text-[#3d7ff5]",
  Good: "text-[#4c45e6]",
  "Keep practicing": "text-streak",
};

export const scoreLabels: { key: keyof LessonScores; label: string }[] = [
  { key: "speaking", label: "Speaking" },
  { key: "pronunciation", label: "Pronunciation" },
  { key: "grammar", label: "Grammar" },
];

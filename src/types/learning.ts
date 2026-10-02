// Shared types for the hardcoded learning content in `data/`.

export type LanguageCode = "es" | "fr" | "ja" | "ko" | "de" | "zh" | "it" | "en";

export type Language = {
  code: LanguageCode;
  name: string; // English name, e.g. "Spanish"
  nativeName: string; // e.g. "Español"
  flagUrl: string; // remote flag image from flagcdn.com
  learners: string; // display value, e.g. "28.4M"
};

export type Unit = {
  id: string;
  languageCode: LanguageCode;
  order: number;
  title: string;
  description: string;
};

export type VocabularyItem = {
  word: string;
  translation: string;
  pronunciation?: string; // romanization for non-Latin scripts
};

export type Phrase = {
  text: string;
  translation: string;
  pronunciation?: string;
};

export type ActivityType = "vocabulary" | "listen-and-repeat" | "conversation";

export type Activity = {
  type: ActivityType;
  title: string;
  instructions: string;
};

// Lesson-specific context for the AI teacher (Vision Agent, audio only).
// The backend combines this with the lesson goal, vocabulary and phrases.
export type AITeacherPrompt = {
  scenario: string; // the situation the teacher role-plays
  instructions: string; // what the teacher should focus on
  openingLine: string; // the first thing the teacher says
};

export type Lesson = {
  id: string;
  unitId: string;
  languageCode: LanguageCode;
  order: number;
  title: string;
  goal: string;
  durationMinutes: number;
  xp: number;
  vocabulary: VocabularyItem[];
  phrases: Phrase[];
  activities: Activity[];
  aiTeacher: AITeacherPrompt;
};

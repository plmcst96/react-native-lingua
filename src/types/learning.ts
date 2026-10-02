export type LanguageCode = "es" | "fr" | "ja" | "ko" | "de" | "zh" | "it" | "en";

export type Language = {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flagUrl: string;
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

// The backend combines this with the lesson goal, vocabulary and phrases.
export type AITeacherPrompt = {
  scenario: string;
  instructions: string;
  openingLine: string;
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

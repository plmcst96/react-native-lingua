import type { LanguageCode, Unit } from "@/types/learning";

export const units: Unit[] = [
  // Spanish
  {
    id: "es-u1",
    languageCode: "es",
    order: 1,
    title: "Basics",
    description: "Say hello, introduce yourself and talk about your day.",
  },
  {
    id: "es-u2",
    languageCode: "es",
    order: 2,
    title: "At the Café",
    description: "Order drinks and pay the bill like a local.",
  },

  // French
  {
    id: "fr-u1",
    languageCode: "fr",
    order: 1,
    title: "Basics",
    description: "Greet people and buy bread at the bakery.",
  },

  // Japanese
  {
    id: "ja-u1",
    languageCode: "ja",
    order: 1,
    title: "Basics",
    description: "Learn everyday greetings and introduce yourself.",
  },

  // Korean
  {
    id: "ko-u1",
    languageCode: "ko",
    order: 1,
    title: "Basics",
    description: "Learn polite greetings and introduce yourself.",
  },

  // German
  {
    id: "de-u1",
    languageCode: "de",
    order: 1,
    title: "Basics",
    description: "Greet people and introduce yourself.",
  },

  // Chinese
  {
    id: "zh-u1",
    languageCode: "zh",
    order: 1,
    title: "Basics",
    description: "Learn simple greetings and introduce yourself.",
  },

  // Italian
  {
    id: "it-u1",
    languageCode: "it",
    order: 1,
    title: "Basics",
    description: "Greet people and order at an Italian bar.",
  },

  // English
  {
    id: "en-u1",
    languageCode: "en",
    order: 1,
    title: "Basics",
    description: "Greet people and make simple small talk.",
  },
];

/**
 * Return matching units sorted by ascending order, or an empty array if none match.
 * Sorting leaves the source array unchanged; unit objects are shared with it.
 */
export function getUnitsByLanguage(languageCode: LanguageCode) {
  return units
    .filter((unit) => unit.languageCode === languageCode)
    .sort((a, b) => a.order - b.order);
}

/** Return the first unit with the exact ID, or undefined if none matches. */
export function getUnitById(id: string) {
  return units.find((unit) => unit.id === id);
}

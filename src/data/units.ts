import type { LanguageCode, Unit } from "@/types/learning";

export const units: Unit[] = [
  {
    id: "es-u1",
    languageCode: "es",
    order: 1,
    level: "A1",
    title: "Basics",
    description: "Say hello, introduce yourself and talk about your day.",
  },
  {
    id: "es-u2",
    languageCode: "es",
    order: 2,
    level: "A1",
    title: "At the Café",
    description: "Order drinks and pay the bill like a local.",
  },
  {
    id: "fr-u1",
    languageCode: "fr",
    order: 1,
    level: "A1",
    title: "Basics",
    description: "Greet people and buy bread at the bakery.",
  },
  {
    id: "ja-u1",
    languageCode: "ja",
    order: 1,
    level: "A1",
    title: "Basics",
    description: "Learn everyday greetings and introduce yourself.",
  },
  {
    id: "ko-u1",
    languageCode: "ko",
    order: 1,
    level: "A1",
    title: "Basics",
    description: "Learn polite greetings and introduce yourself.",
  },
  {
    id: "de-u1",
    languageCode: "de",
    order: 1,
    level: "A1",
    title: "Basics",
    description: "Greet people and introduce yourself.",
  },
  {
    id: "zh-u1",
    languageCode: "zh",
    order: 1,
    level: "A1",
    title: "Basics",
    description: "Learn simple greetings and introduce yourself.",
  },
  {
    id: "it-u1",
    languageCode: "it",
    order: 1,
    level: "A1",
    title: "Basics",
    description: "Greet people and order at an Italian bar.",
  },
  {
    id: "en-u1",
    languageCode: "en",
    order: 1,
    level: "A1",
    title: "Basics",
    description: "Greet people and make simple small talk.",
  },
];

export function getUnitsByLanguage(languageCode: LanguageCode) {
  return units
    .filter((unit) => unit.languageCode === languageCode)
    .sort((a, b) => a.order - b.order);
}

export function getUnitById(id: string) {
  return units.find((unit) => unit.id === id);
}

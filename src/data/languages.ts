import type { Language, LanguageCode } from "@/types/learning";

// Flag images come from flagcdn.com, which uses country codes (e.g. "jp"),
// not language codes (e.g. "ja").
export const languages: Language[] = [
  {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    flagUrl: "https://flagcdn.com/w160/es.png",
    learners: "28.4M",
  },
  {
    code: "fr",
    name: "French",
    nativeName: "Français",
    flagUrl: "https://flagcdn.com/w160/fr.png",
    learners: "19.4M",
  },
  {
    code: "ja",
    name: "Japanese",
    nativeName: "日本語",
    flagUrl: "https://flagcdn.com/w160/jp.png",
    learners: "12.7M",
  },
  {
    code: "ko",
    name: "Korean",
    nativeName: "한국어",
    flagUrl: "https://flagcdn.com/w160/kr.png",
    learners: "9.3M",
  },
  {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    flagUrl: "https://flagcdn.com/w160/de.png",
    learners: "8.1M",
  },
  {
    code: "zh",
    name: "Chinese",
    nativeName: "中文",
    flagUrl: "https://flagcdn.com/w160/cn.png",
    learners: "7.4M",
  },
  {
    code: "it",
    name: "Italian",
    nativeName: "Italiano",
    flagUrl: "https://flagcdn.com/w160/it.png",
    learners: "6.2M",
  },
  {
    code: "en",
    name: "English",
    nativeName: "English",
    flagUrl: "https://flagcdn.com/w160/gb.png",
    learners: "5.8M",
  },
];

export function getLanguageByCode(code: LanguageCode) {
  return languages.find((language) => language.code === code);
}

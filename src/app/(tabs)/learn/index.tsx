import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import LessonCard from "@/components/LessonCard";
import { images } from "@/constants/images";
import { getLessonPath } from "@/data/lessons";
import { progress } from "@/data/progress";
import { getUnitById } from "@/data/units";
import { posthog } from "@/lib/posthog";
import { posthogLogger } from "@/lib/posthog-logger";
import { useLanguageStore } from "@/store/useLanguageStore";
import type { Lesson, LessonStatus } from "@/types/learning";

type Tab = "lessons" | "practice";

// lesson-hero-cafe.png is 1064x900, including the strip the tabs sit on.
const HERO_RATIO = 900 / 1064;

const tabs: { id: Tab; label: string }[] = [
  { id: "lessons", label: "Lessons" },
  { id: "practice", label: "Practice" },
];

export default function Learn() {
  const selectedLanguage = useLanguageStore((state) => state.selectedLanguage);
  const [activeTab, setActiveTab] = useState<Tab>("lessons");
  const { width } = useWindowDimensions();
  const heroHeight = width * HERO_RATIO;

  // The (tabs) guard in _layout.tsx only renders this screen once a language is saved.
  const languageCode = selectedLanguage ?? "es";
  const path = getLessonPath(languageCode);
  const { completedLessonCount } = progress;
  const currentIndex = Math.min(completedLessonCount, path.length - 1);
  const currentLesson = path[currentIndex];
  const currentUnit = currentLesson ? getUnitById(currentLesson.unitId) : undefined;

  function getStatus(index: number): LessonStatus {
    if (index < completedLessonCount) return "completed";
    if (index === completedLessonCount) return "in-progress";
    return "not-started";
  }

  function openLesson(lesson: Lesson) {
    posthog?.capture("lesson_started", {
      language_code: languageCode,
      lesson_id: lesson.id,
      source: "lessons_list",
    });
    posthogLogger.lessonLaunchRequested(languageCode, lesson.id, "lessons_list");
    router.push({ pathname: "/learn/lesson/[id]", params: { id: lesson.id } });
  }

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ height: heroHeight }}>
          <Image source={images.lessonHeroCafe} style={{ width, height: heroHeight }} />
          <View className="absolute inset-x-0 top-0 flex-row items-start pl-4 pr-4 pt-[5px]">
            <TouchableOpacity
              hitSlop={10}
              onPress={() => router.navigate("/")}
              accessibilityLabel="Go back"
              className="mt-[5px]"
            >
              <Ionicons name="chevron-back" size={28} color="#0d132b" />
            </TouchableOpacity>
            <View className="ml-[11px] flex-1">
              <Text className="heading--h3" numberOfLines={1}>
                {currentLesson?.title}
              </Text>
              <Text className="mt-0.5 font-poppins text-[15px] leading-6 text-text-secondary">
                Unit {currentUnit?.order} • {Math.min(completedLessonCount + 1, path.length)} /{" "}
                {path.length} lessons
              </Text>
            </View>
            <View className="mt-1 size-[30px]">
              <View className="absolute left-2 top-[3px] h-[22px] w-[14px] bg-white" />
              <View className="absolute left-2 top-[3px] h-[9px] w-[14px] rounded-t-[3px] bg-[#f6a623]" />
              <Ionicons name="bookmark-outline" size={30} color="#2d3561" />
            </View>
          </View>
          {/* The bottom 17.6% of the hero image is filler ground that the tabs cover. */}
          <View className="lesson-tabs absolute bottom-0 left-3 right-3 h-[17.6%]">
            {tabs.map((tab) => {
              const isActive = tab.id === activeTab;
              return (
                <TouchableOpacity
                  key={tab.id}
                  activeOpacity={0.8}
                  onPress={() => setActiveTab(tab.id)}
                  accessibilityRole="tab"
                  accessibilityState={{ selected: isActive }}
                  className={`lesson-tabs__item ${isActive ? "lesson-tabs__item--active" : ""}`}
                >
                  <Text
                    className={`font-poppins-medium text-lg ${
                      isActive ? "text-lingua-deep-purple" : "text-[#3a4058]"
                    }`}
                  >
                    {tab.label}
                  </Text>
                  {isActive && <View className="lesson-tabs__indicator" />}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        {activeTab === "lessons" ? (
          <View className="mt-[19px] gap-2 px-[18px] pb-6">
            {path.map((lesson, index) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                number={index + 1}
                status={getStatus(index)}
                onPress={() => openLesson(lesson)}
              />
            ))}
          </View>
        ) : (
          <View className="items-center px-8 pb-6 pt-12">
            <View className="size-16 items-center justify-center rounded-full bg-lingua-purple/10">
              <Ionicons name="barbell-outline" size={30} color="#5b3bf6" />
            </View>
            <Text className="heading--h4 mt-4">Practice is coming soon</Text>
            <Text className="mt-1 text-center font-poppins text-sm leading-[22px] text-text-secondary">
              Review the words and phrases from your lessons here.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

import Ionicons from "@expo/vector-icons/Ionicons";
import { useUser } from "@clerk/expo";
import { router } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import PlanItem from "@/components/PlanItem";
import { images } from "@/constants/images";
import { getLanguageByCode } from "@/data/languages";
import { getCurrentLesson } from "@/data/lessons";
import { progress } from "@/data/progress";
import { getUnitById } from "@/data/units";
import { posthog } from "@/lib/posthog";
import { posthogLogger } from "@/lib/posthog-logger";
import { useLanguageStore } from "@/store/useLanguageStore";

export default function Home() {
  const { user } = useUser();
  const selectedLanguage = useLanguageStore((state) => state.selectedLanguage);

  // The (tabs) guard in _layout.tsx only renders Home once a language is saved.
  const languageCode = selectedLanguage ?? "es";
  const language = getLanguageByCode(languageCode);
  const lesson = getCurrentLesson(languageCode, progress.completedLessonCount);
  const unit = lesson ? getUnitById(lesson.unitId) : undefined;
  const conversation = lesson?.activities.find((activity) => activity.type === "conversation");

  const firstName = user?.firstName ?? user?.username ?? "there";
  const goalPercent = Math.min(progress.xpToday / progress.dailyGoalXp, 1) * 100;

  function startLesson(source: "continue" | "view_all") {
    if (!lesson) return;
    posthog?.capture("lesson_started", {
      language_code: languageCode,
      lesson_id: lesson.id,
      source,
    });
    posthogLogger.lessonLaunchRequested(languageCode, lesson.id, source);
    router.push("/learn");
  }

  const plan = [
    {
      id: "lesson",
      icon: "book",
      iconBackground: "bg-lingua-purple",
      title: "Lesson",
      subtitle: lesson?.title ?? "",
    },
    {
      id: "conversation",
      icon: "headset",
      iconBackground: "bg-lingua-purple",
      title: "AI Conversation",
      subtitle: conversation?.title ?? "",
    },
    {
      id: "words",
      icon: "game-controller",
      iconBackground: "bg-plan-coral",
      title: "New words",
      subtitle: `${lesson?.vocabulary.length ?? 0} words`,
    },
  ] as const;

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-4 pb-6">
          <View className="mt-1 h-11 flex-row items-center">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push("/language-selection")}
              accessibilityLabel="Change language"
            >
              <Image source={{ uri: language?.flagUrl }} className="size-[34px] rounded-full" />
            </TouchableOpacity>
            <Text
              className="ml-3 flex-1 font-poppins-semibold text-lg text-text-primary"
              numberOfLines={1}
            >
              {language?.greeting}, {firstName}! 👋
            </Text>
            {/* The fire artwork includes grass, so it's cropped to just the flame. */}
            <View className="h-[26px] w-[22px] overflow-hidden">
              <Image source={images.streakFire} className="-ml-[14.5px] -mt-[9px] size-[51px]" />
            </View>
            <Text className="ml-2 font-poppins-medium text-lg text-text-primary">
              {progress.streakDays}
            </Text>
            <View className="ml-[26px]">
              <Ionicons name="notifications-outline" size={24} color="#0d132b" />
            </View>
          </View>
          <View className="mt-5 rounded-[20px] bg-goal-surface px-5 pb-5 pt-5">
            <Text className="font-poppins text-[17px] leading-6 text-text-primary">Daily goal</Text>
            <View className="mt-1 flex-row items-baseline">
              <Text className="font-poppins-bold text-[30px] leading-9 text-text-primary">
                {progress.xpToday}
              </Text>
              <Text className="ml-2 font-poppins text-[17px] text-text-secondary">
                / {progress.dailyGoalXp} XP
              </Text>
            </View>
            <View className="mr-[116px] mt-3 h-2 overflow-hidden rounded-full bg-goal-track">
              <View className="h-full rounded-full bg-goal-fill" style={{ width: `${goalPercent}%` }} />
            </View>
            <Image source={images.treasure} className="absolute right-2.5 top-[9px] size-[112px]" />
          </View>
          <View className="card--continue mt-5 px-5 pb-[11px] pt-[18px]">
            <View className="absolute left-[120px] top-[110px] size-[130px] rotate-45 rounded-2xl bg-[#4b34e0]/40" />
            <View className="absolute left-[210px] top-[60px] size-[160px] rotate-45 rounded-2xl bg-[#4b34e0]/30" />
            <Image source={images.palace} className="absolute -bottom-[35px] -right-[30px] size-[208px]" />
            <Text className="font-poppins text-base leading-6 text-white">
              {lesson ? "Continue learning" : "All lessons completed 🎉"}
            </Text>
            <Text className="mt-1 font-poppins-semibold text-[28px] leading-[34px] text-white">
              {language?.name}
            </Text>
            {lesson ? (
              <>
                <Text className="mt-0.5 font-poppins text-lg leading-[26px] text-white">
                  {unit?.level} • Unit {unit?.order}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => startLesson("continue")}
                  className="mt-2.5 h-10 self-start justify-center rounded-xl bg-white px-[18px]"
                >
                  <Text className="font-poppins-semibold text-[17px] text-lingua-deep-purple">
                    Continue
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <Text className="mt-0.5 w-[55%] font-poppins text-base leading-6 text-white">
                Great job! New lessons are coming soon.
              </Text>
            )}
          </View>
          {lesson && (
            <>
              <View className="mt-[22px] flex-row items-center justify-between">
                <Text className="font-poppins-semibold text-[19px] leading-7 text-text-primary">
                  Today&apos;s plan
                </Text>
                <TouchableOpacity hitSlop={10} onPress={() => startLesson("view_all")}>
                  <Text className="font-poppins-medium text-lg text-lingua-deep-purple">View all</Text>
                </TouchableOpacity>
              </View>
              <View className="mt-5 gap-[22px]">
                {plan.map((item) => (
                  <PlanItem
                    key={item.id}
                    icon={item.icon}
                    iconBackground={item.iconBackground}
                    title={item.title}
                    subtitle={item.subtitle}
                    isDone={progress.completedPlanItemIds.includes(`${lesson.id}:${item.id}`)}
                  />
                ))}
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

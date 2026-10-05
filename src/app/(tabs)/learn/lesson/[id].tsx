import { useUser } from "@clerk/expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import { type ComponentProps, Fragment, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";
import { getLanguageByCode } from "@/data/languages";
import { getLessonById } from "@/data/lessons";
import { getUnitById } from "@/data/units";

type IconName = ComponentProps<typeof Ionicons>["name"];

type TeacherLine = {
  text: string;
  translation?: string;
  pronunciation?: string;
};

type Control = {
  label: string;
  icon: IconName;
  isOn: boolean;
  onPress: () => void;
};

// Placeholder scores until the AI teacher grades the learner's speech.
const feedback = [
  { label: "Speaking", value: "Excellent", colorClassName: "text-[#43c13a]" },
  { label: "Pronunciation", value: "Great", colorClassName: "text-[#3d7ff5]" },
  { label: "Grammar", value: "Good", colorClassName: "text-[#4c45e6]" },
];

export default function AudioLessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useUser();
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [lineIndex, setLineIndex] = useState(0);

  const lesson = getLessonById(id);

  if (!lesson) {
    return (
      <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: "#ffffff" }}>
        <View className="h-11 flex-row items-center px-4">
          <TouchableOpacity hitSlop={10} onPress={() => router.back()} accessibilityLabel="Go back">
            <Ionicons name="chevron-back" size={28} color="#0d132b" />
          </TouchableOpacity>
        </View>
        <View className="flex-1 items-center justify-center">
          <Text className="heading--h4">Lesson not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const language = getLanguageByCode(lesson.languageCode);
  const unit = getUnitById(lesson.unitId);
  const teacherLines: TeacherLine[] = [{ text: lesson.aiTeacher.openingLine }, ...lesson.phrases];
  const currentLine = teacherLines[lineIndex];

  const controls: Control[] = [
    {
      label: "Camera",
      icon: isCameraOn ? "videocam" : "videocam-off",
      isOn: isCameraOn,
      onPress: () => setIsCameraOn(!isCameraOn),
    },
    {
      label: "Mic",
      icon: isMicOn ? "mic" : "mic-off",
      isOn: isMicOn,
      onPress: () => setIsMicOn(!isMicOn),
    },
    {
      label: "Subtitles",
      icon: "language",
      isOn: showSubtitles,
      onPress: () => setShowSubtitles(!showSubtitles),
    },
  ];

  function showNextLine() {
    setLineIndex(Math.min(lineIndex + 1, teacherLines.length - 1));
  }

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View className="flex-row items-center px-4 pb-[18px] pt-[5px]">
        <TouchableOpacity hitSlop={10} onPress={() => router.back()} accessibilityLabel="Go back">
          <Ionicons name="chevron-back" size={28} color="#0d132b" />
        </TouchableOpacity>
        <View className="ml-[11px] flex-1">
          <Text className="heading--h3">AI Teacher</Text>
          <View className="mt-0.5 flex-row items-center">
            <View
              className={`size-2.5 rounded-full ${isMicOn ? "bg-success" : "bg-text-secondary"}`}
            />
            <Text className="ml-1.5 font-poppins text-[15px] leading-6 text-text-secondary">
              {isMicOn ? "Online" : "Mic muted"}
            </Text>
          </View>
        </View>
        <View className="flex-row gap-2">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setIsCameraOn(!isCameraOn)}
            accessibilityLabel={isCameraOn ? "Hide your preview" : "Show your preview"}
            className="audio-lesson__header-button"
          >
            <Ionicons
              name={isCameraOn ? "videocam-outline" : "videocam-off-outline"}
              size={20}
              color="#0d132b"
            />
          </TouchableOpacity>
          <View
            className="audio-lesson__header-button"
            accessibilityLabel={`${lesson.durationMinutes} minute lesson`}
          >
            <Text className="font-poppins-medium text-base text-text-primary">
              {lesson.durationMinutes}
            </Text>
          </View>
          <View className="audio-lesson__header-button">
            <Ionicons name="notifications-outline" size={20} color="#0d132b" />
          </View>
        </View>
      </View>
      <View className="audio-lesson__stage mx-0.5 flex-1">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.stageContent}
        >
          <View className="min-h-40 flex-1 items-center pt-4">
            <Image source={images.mascotWelcome} resizeMode="contain" className="h-full w-full" />
          </View>
          <View className="absolute left-3.5 right-[128px] top-3.5 items-start">
            <View className="audio-lesson__lesson-chip">
              {language && (
                <Image source={{ uri: language.flagUrl }} className="size-7 rounded-full" />
              )}
              <View className="ml-2 shrink">
                <Text
                  className="font-poppins-semibold text-[13px] leading-5 text-text-primary"
                  numberOfLines={1}
                >
                  {lesson.title}
                </Text>
                <Text className="caption" numberOfLines={1}>
                  {language?.name} • Unit {unit?.order}
                </Text>
              </View>
            </View>
          </View>
          <View className="audio-lesson__self-view">
            {isCameraOn && user?.imageUrl ? (
              <Image source={{ uri: user.imageUrl }} className="size-full" />
            ) : (
              <View className="flex-1 items-center justify-center">
                <Ionicons name="videocam-off" size={26} color="#ffffff" />
              </View>
            )}
          </View>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={showNextLine}
            accessibilityHint="Shows the teacher's next line"
            className="mx-16 -mt-7"
          >
            <View className="absolute -bottom-2 right-6 size-5 rotate-45 rounded-[3px] bg-white" />
            <View className="audio-lesson__bubble">
              <View className="flex-1">
                <Text className="font-poppins text-[18px] leading-[30px] text-text-primary">
                  {currentLine.text}
                </Text>
                {showSubtitles && currentLine.pronunciation && (
                  <Text className="font-poppins text-sm leading-[22px] text-text-secondary">
                    {currentLine.pronunciation}
                  </Text>
                )}
                {showSubtitles && currentLine.translation && (
                  <Text className="font-poppins text-[18px] leading-[30px] text-text-primary">
                    {currentLine.translation}
                  </Text>
                )}
              </View>
              <View className="ml-3">
                <Ionicons name="volume-high" size={30} color="#5d5ff6" />
              </View>
            </View>
          </TouchableOpacity>
          <View className="mt-3 flex-row px-2.5">
            {controls.map((control) => (
              <TouchableOpacity
                key={control.label}
                activeOpacity={0.8}
                onPress={control.onPress}
                accessibilityRole="switch"
                accessibilityState={{ checked: control.isOn }}
                accessibilityLabel={control.label}
                className="flex-1 items-center"
              >
                <View className="audio-lesson__control">
                  <Ionicons
                    name={control.icon}
                    size={28}
                    color={control.isOn ? "#1e2350" : "#9ca3af"}
                  />
                </View>
                <Text className="audio-lesson__control-label">{control.label}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.back()}
              accessibilityRole="button"
              accessibilityLabel="End call"
              className="flex-1 items-center"
            >
              <View className="audio-lesson__control audio-lesson__control--end">
                <View className="rotate-[135deg]">
                  <Ionicons name="call" size={28} color="#ffffff" />
                </View>
              </View>
              <Text className="audio-lesson__control-label">End Call</Text>
            </TouchableOpacity>
          </View>
          <View className="audio-lesson__feedback mx-3.5 mt-5">
            {feedback.map((item, index) => (
              <Fragment key={item.label}>
                {index > 0 && <View className="my-[-6px] w-px bg-border" />}
                <View className="flex-auto gap-2.5 px-5">
                  <Text className="font-poppins-medium text-sm leading-[22px] text-text-primary">
                    {item.label}
                  </Text>
                  <Text
                    className={`font-poppins-medium text-sm leading-[22px] ${item.colorClassName}`}
                  >
                    {item.value}
                  </Text>
                </View>
              </Fragment>
            ))}
          </View>
          <Text
            className="mx-6 mb-4 mt-3 text-center font-poppins text-[13px] leading-5 text-text-secondary"
            numberOfLines={2}
          >
            Goal: {lesson.goal}
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

// flexGrow lets the mascot fill spare height, then the stage scrolls once content outgrows it.
const styles = StyleSheet.create({
  stageContent: {
    flexGrow: 1,
  },
});

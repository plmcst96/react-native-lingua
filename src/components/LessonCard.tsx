import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, Text, TouchableOpacity, View } from "react-native";

import type { Lesson, LessonStatus } from "@/types/learning";

type LessonCardProps = {
  lesson: Lesson;
  number: number;
  status: LessonStatus;
  onPress: () => void;
};

export default function LessonCard({ lesson, number, status, onPress }: LessonCardProps) {
  const isCurrent = status === "in-progress";

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Lesson ${number}: ${lesson.title}`}
      className={`lesson-card py-3 ${isCurrent ? "lesson-card--current" : "lesson-card--default"}`}
    >
      <View className="mr-3 flex-1">
        <View className="flex-row items-center">
          <Text
            className={`font-poppins text-sm leading-5 ${
              isCurrent ? "text-lingua-deep-purple" : "text-text-secondary"
            }`}
          >
            Lesson {number}
          </Text>
          {isCurrent && (
            <View className="lesson-badge">
              <Text className="font-poppins-medium text-[11px] leading-5 text-lingua-deep-purple">
                In progress
              </Text>
            </View>
          )}
        </View>
        <Text
          className={`mt-1 text-base leading-6 text-text-primary ${
            isCurrent ? "font-poppins-semibold" : "font-poppins-medium"
          }`}
          numberOfLines={1}
        >
          {lesson.title}
        </Text>
        <Text className="mt-0.5 font-poppins text-[13px] leading-[18px] text-text-secondary">
          {lesson.activities.length} activities • {lesson.xp} XP
        </Text>
      </View>
      {status === "completed" && <Ionicons name="checkmark-circle" size={26} color="#62be38" />}
      {isCurrent && <Image source={lesson.image} className="size-[42px] rounded-[10px]" />}
      {status === "not-started" && <Ionicons name="lock-closed-outline" size={22} color="#4b5470" />}
    </TouchableOpacity>
  );
}

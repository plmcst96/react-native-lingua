import { Image, Modal, Text, TouchableOpacity, View } from "react-native";

import { images } from "@/constants/images";
import { ratingColorClassNames, scoreLabels } from "@/constants/ratings";
import type { LessonScores } from "@/types/learning";

type LessonCompleteModalProps = {
  scores: LessonScores | undefined;
  lessonTitle: string;
  xp: number;
  onContinue: () => void;
};

export default function LessonCompleteModal({
  scores,
  lessonTitle,
  xp,
  onContinue,
}: LessonCompleteModalProps) {
  return (
    <Modal visible={Boolean(scores)} transparent animationType="fade" onRequestClose={onContinue}>
      <View className="lesson-complete__backdrop">
        <View className="lesson-complete__card">
          <Image source={images.mascotWelcome} resizeMode="contain" className="h-36 w-36" />
          <Text className="heading--h2 mt-2 text-center">Lesson complete!</Text>
          <Text className="body--md mt-1 text-center text-text-secondary" numberOfLines={2}>
            {lessonTitle}
          </Text>
          <View className="lesson-complete__xp">
            <Image source={images.treasure} className="size-7" />
            <Text className="ml-1.5 font-poppins-semibold text-base text-goal-fill">+{xp} XP</Text>
          </View>
          <View className="mt-5 w-full flex-row justify-between">
            {scoreLabels.map(({ key, label }) => (
              <View key={key} className="flex-1 items-center gap-1">
                <Text className="caption">{label}</Text>
                {scores && (
                  <Text
                    className={`font-poppins-semibold text-sm leading-5 ${ratingColorClassNames[scores[key]]}`}
                  >
                    {scores[key]}
                  </Text>
                )}
              </View>
            ))}
          </View>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={onContinue}
            className="button--gradient mt-6 w-full"
          >
            <Text className="button__label">Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

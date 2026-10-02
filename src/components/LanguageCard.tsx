import { SymbolView } from "expo-symbols";
import { Image, Text, TouchableOpacity, View } from "react-native";

import type { Language } from "@/types/learning";

type LanguageCardProps = {
  language: Language;
  isSelected: boolean;
  onPress: () => void;
};

// One row in the language list: round flag, name, learners and a check or chevron.
export default function LanguageCard({ language, isSelected, onPress }: LanguageCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
      className={`h-20 flex-row items-center rounded-2xl pl-4 pr-5 shadow-card ${
        isSelected
          ? "border-[1.5px] border-lingua-purple bg-[#f6f4ff]"
          : "border border-[#eef0f5] bg-white"
      }`}
    >
      <Image
        source={{ uri: language.flagUrl }}
        className="size-[38px] rounded-full border border-[#eef0f5]"
      />

      <View className="ml-[18px] flex-1">
        <Text className="font-poppins-medium text-[17px] leading-6 text-text-primary">
          {language.name}
        </Text>
        <Text className="mt-1 font-poppins text-sm leading-5 text-text-secondary">
          {language.learners} learners
        </Text>
      </View>

      {/* Fixed-width slot so the check and the chevron line up */}
      <View className="w-[26px] items-center">
        {isSelected ? (
          <View className="size-[26px] items-center justify-center rounded-full bg-lingua-purple">
            <SymbolView
              name={{ ios: "checkmark", android: "check" }}
              weight="bold"
              size={13}
              tintColor="#ffffff"
            />
          </View>
        ) : (
          <SymbolView
            name={{ ios: "chevron.right", android: "chevron_right" }}
            weight="semibold"
            size={15}
            tintColor="#6b7280"
          />
        )}
      </View>
    </TouchableOpacity>
  );
}

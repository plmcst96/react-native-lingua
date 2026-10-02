import Ionicons from "@expo/vector-icons/Ionicons";
import type { ComponentProps } from "react";
import { Text, View } from "react-native";

type PlanItemProps = {
  icon: ComponentProps<typeof Ionicons>["name"];
  iconBackground: string; // className, e.g. "bg-lingua-purple"
  title: string;
  subtitle: string;
  isDone: boolean;
};

export default function PlanItem({ icon, iconBackground, title, subtitle, isDone }: PlanItemProps) {
  return (
    <View className="flex-row items-center">
      <View className={`size-[42px] items-center justify-center rounded-[11px] ${iconBackground}`}>
        <Ionicons name={icon} size={22} color="#ffffff" />
      </View>
      <View className="ml-[18px] flex-1">
        <Text className="font-poppins-medium text-[17px] leading-6 text-text-primary" numberOfLines={1}>
          {title}
        </Text>
        <Text className="font-poppins text-[15px] leading-[22px] text-text-secondary" numberOfLines={1}>
          {subtitle}
        </Text>
      </View>
      {isDone ? (
        <View className="mr-3 size-6 items-center justify-center rounded-full bg-lingua-purple">
          <Ionicons name="checkmark" size={15} color="#ffffff" />
        </View>
      ) : (
        <View className="mr-3 size-6 rounded-full border-2 border-[#8e93a6]" />
      )}
    </View>
  );
}

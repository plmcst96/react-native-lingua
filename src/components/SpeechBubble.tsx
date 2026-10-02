import { Text, View } from "react-native";

type SpeechBubbleProps = {
  text: string;
  tail: "left" | "right";
  className?: string;
  colorClassName: string;
  textClassName: string;
};

export default function SpeechBubble({
  text,
  tail,
  className,
  colorClassName,
  textClassName,
}: SpeechBubbleProps) {
  return (
    <View className={className}>
      {/* A rotated square peeking out under the bubble makes the pointer. */}
      <View
        className={`absolute -bottom-1.5 size-4 rotate-45 rounded-[3px] ${
          tail === "left" ? "left-5" : "right-5"
        } ${colorClassName}`}
      />
      <View className={`rounded-2xl px-5 py-3 ${colorClassName}`}>
        <Text
          className={`font-poppins-medium text-[20px] leading-[30px] ${textClassName}`}
        >
          {text}
        </Text>
      </View>
    </View>
  );
}

import { Text, View } from "react-native";

type SpeechBubbleProps = {
  text: string;
  // Which bottom corner the little pointer sits under.
  tail: "left" | "right";
  // Position and rotation, e.g. "absolute left-10 top-5 -rotate-6".
  className?: string;
  // Background color, shared by the bubble and its tail.
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

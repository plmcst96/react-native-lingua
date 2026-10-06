import Ionicons from "@expo/vector-icons/Ionicons";
import { type ComponentProps, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export type MicState = "muted" | "teacher-speaking" | "ready" | "listening";

type IconName = ComponentProps<typeof Ionicons>["name"];

type MicDisplay = {
  label: string;
  icon: IconName;
  iconColor: string;
  className: string;
};

const MIC_SIZE = 84;

const micDisplays: Record<MicState, MicDisplay> = {
  muted: { label: "Muted", icon: "mic-off", iconColor: "#9ca3af", className: "" },
  "teacher-speaking": {
    label: "Lingo is speaking",
    icon: "mic",
    iconColor: "#9ca3af",
    className: "audio-lesson__mic--waiting",
  },
  ready: { label: "Mic on", icon: "mic", iconColor: "#1e2350", className: "" },
  listening: {
    label: "Listening…",
    icon: "mic",
    iconColor: "#ffffff",
    className: "audio-lesson__mic--listening",
  },
};

type MicButtonProps = {
  state: MicState;
  onPress: () => void;
};

export default function MicButton({ state, onPress }: MicButtonProps) {
  const display = micDisplays[state];
  const isListening = state === "listening";
  const pulse = useSharedValue(0);

  useEffect(() => {
    if (isListening) {
      pulse.set(withRepeat(withTiming(1, { duration: 1100 }), -1));
    } else {
      cancelAnimation(pulse);
      pulse.set(0);
    }
  }, [isListening, pulse]);

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: 0.45 * (1 - pulse.get()),
    transform: [{ scale: 1 + pulse.get() * 0.35 }],
  }));

  return (
    <View className="items-center">
      <View className="items-center justify-center">
        <Animated.View style={[styles.pulse, pulseStyle]} />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onPress}
          accessibilityRole="switch"
          accessibilityState={{ checked: state !== "muted" }}
          accessibilityLabel="Microphone"
          accessibilityHint={display.label}
          className={`audio-lesson__mic ${display.className}`}
        >
          <Ionicons name={display.icon} size={36} color={display.iconColor} />
        </TouchableOpacity>
      </View>
      <Text className="audio-lesson__control-label">{display.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pulse: {
    position: "absolute",
    width: MIC_SIZE,
    height: MIC_SIZE,
    borderRadius: MIC_SIZE / 2,
    backgroundColor: "#5b3bf6",
  },
});

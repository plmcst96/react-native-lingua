import Ionicons from "@expo/vector-icons/Ionicons";
import type { BottomTabBarProps } from "expo-router/js-tabs";
import { type ComponentProps, useEffect, useRef, useState } from "react";
import { type LayoutChangeEvent, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BAR_HEIGHT = 72;
const CIRCLE_SIZE = 56;

// Low damping makes the circle overshoot the tab and bounce back.
const SLIDE_SPRING = { damping: 12, stiffness: 180, mass: 1 };
const POP_SPRING = { damping: 8, stiffness: 250, mass: 1 };

type IconName = ComponentProps<typeof Ionicons>["name"];
type TabRouteName = "index" | "learn" | "ai-teacher" | "chat" | "profile";
type TabIconPair = { active: IconName; inactive: IconName };

const tabIcons: Record<TabRouteName, TabIconPair> = {
  index: { active: "home", inactive: "home-outline" },
  learn: { active: "book", inactive: "book-outline" },
  "ai-teacher": { active: "sparkles", inactive: "sparkles-outline" },
  chat: { active: "chatbubbles", inactive: "chatbubbles-outline" },
  profile: { active: "person", inactive: "person-outline" },
};
const fallbackTabIcons: TabIconPair = { active: "apps", inactive: "apps-outline" };

function getCircleX(index: number, tabWidth: number) {
  return index * tabWidth + (tabWidth - CIRCLE_SIZE) / 2;
}

export default function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const [tabWidth, setTabWidth] = useState(0);
  const circleX = useSharedValue(0);
  const circleScale = useSharedValue(1);
  const previousIndex = useRef(state.index);

  useEffect(() => {
    circleX.set(withSpring(getCircleX(state.index, tabWidth), SLIDE_SPRING));

    // Only pop on a real tab change, not on the first layout.
    if (previousIndex.current !== state.index) {
      circleScale.set(withSequence(withTiming(0.8, { duration: 100 }), withSpring(1, POP_SPRING)));
      previousIndex.current = state.index;
    }
  }, [state.index, tabWidth, circleX, circleScale]);

  const circleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: circleX.get() }, { scale: circleScale.get() }],
  }));

  // Jump straight to the first position so the circle doesn't slide in from the left edge.
  function handleLayout(event: LayoutChangeEvent) {
    const width = event.nativeEvent.layout.width / state.routes.length;
    circleX.set(getCircleX(state.index, width));
    setTabWidth(width);
  }

  return (
    // The full inset leaves a gap; the home indicator only needs part of it.
    <View className="tab-bar" style={{ paddingBottom: Math.max(insets.bottom - 25, 8) }}>
      <View className="flex-row" style={{ height: BAR_HEIGHT }} onLayout={handleLayout}>
        {tabWidth > 0 && <Animated.View style={[styles.circle, circleStyle]} />}
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const label = descriptors[route.key].options.title ?? route.name;
          const icons = tabIcons[route.name as TabRouteName] ?? fallbackTabIcons;

          function handlePress() {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          }

          return (
            <TouchableOpacity
              key={route.key}
              activeOpacity={0.7}
              onPress={handlePress}
              accessibilityRole="tab"
              accessibilityState={{ selected: isFocused }}
              accessibilityLabel={label}
              className="flex-1 items-center justify-center"
            >
              <Ionicons
                name={isFocused ? icons.active : icons.inactive}
                size={24}
                color={isFocused ? "#ffffff" : "#6b7280"}
              />
              {!isFocused && <Text className="tab-bar__label mt-1">{label}</Text>}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    position: "absolute",
    top: (BAR_HEIGHT - CIRCLE_SIZE) / 2,
    left: 0,
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: "#5b3bf6",
  },
});

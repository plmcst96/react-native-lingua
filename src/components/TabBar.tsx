import Ionicons from "@expo/vector-icons/Ionicons";
import type { BottomTabBarProps } from "expo-router/js-tabs";
import { type ComponentProps, useEffect, useState } from "react";
import { type LayoutChangeEvent, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BAR_HEIGHT = 72;
const CIRCLE_SIZE = 56;

type IconName = ComponentProps<typeof Ionicons>["name"];

const tabIcons: Record<string, { active: IconName; inactive: IconName }> = {
  index: { active: "home", inactive: "home-outline" },
  learn: { active: "book", inactive: "book-outline" },
  "ai-teacher": { active: "sparkles", inactive: "sparkles-outline" },
  chat: { active: "chatbubbles", inactive: "chatbubbles-outline" },
  profile: { active: "person", inactive: "person-outline" },
};

function getCircleX(index: number, tabWidth: number) {
  return index * tabWidth + (tabWidth - CIRCLE_SIZE) / 2;
}

export default function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const [tabWidth, setTabWidth] = useState(0);
  const circleX = useSharedValue(0);

  useEffect(() => {
    circleX.set(
      withTiming(getCircleX(state.index, tabWidth), {
        duration: 260,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
      }),
    );
  }, [state.index, tabWidth, circleX]);

  const circleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: circleX.get() }],
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
                name={isFocused ? tabIcons[route.name].active : tabIcons[route.name].inactive}
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

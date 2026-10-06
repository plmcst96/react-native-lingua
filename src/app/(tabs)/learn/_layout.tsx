import { Stack } from "expo-router";

// Opening a lesson straight from Home still puts the lessons list under it, so back works.
export const unstable_settings = {
  initialRouteName: "index",
};

// A stack inside the Learn tab keeps the tab bar visible during a lesson.
export default function LearnLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}

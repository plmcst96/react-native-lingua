import { Stack } from "expo-router";

// A stack inside the Learn tab keeps the tab bar visible during a lesson.
export default function LearnLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}

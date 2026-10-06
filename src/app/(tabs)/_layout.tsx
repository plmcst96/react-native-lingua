import { Tabs } from "expo-router/js-tabs";

import StreamVideoProvider from "@/components/StreamVideoProvider";
import TabBar from "@/components/TabBar";

// Tabs only mount for signed-in users, so the Stream client lives exactly as long as the session.
export default function TabsLayout() {
  return (
    <StreamVideoProvider>
      <Tabs tabBar={(props) => <TabBar {...props} />} screenOptions={{ headerShown: false }}>
        <Tabs.Screen name="index" options={{ title: "Home" }} />
        <Tabs.Screen name="learn" options={{ title: "Learn" }} />
        <Tabs.Screen name="ai-teacher" options={{ title: "AI Teacher" }} />
        <Tabs.Screen name="chat" options={{ title: "Chat" }} />
        <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      </Tabs>
    </StreamVideoProvider>
  );
}

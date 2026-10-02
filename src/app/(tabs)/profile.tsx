import { useClerk } from "@clerk/expo";
import { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

import { logClerkError } from "@/lib/clerk";
import { posthog } from "@/lib/posthog";

export default function Profile() {
  const { signOut } = useClerk();
  const [isSigningOut, setIsSigningOut] = useState(false);

  // On success, _layout.tsx redirects to Sign Up, so only a failure needs resetting.
  async function handleSignOut() {
    setIsSigningOut(true);
    posthog?.capture("user_signed_out");
    try {
      await signOut();
    } catch (error) {
      logClerkError("Sign out failed", error);
      setIsSigningOut(false);
    }
  }

  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="heading--h3">Profile</Text>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={handleSignOut}
        disabled={isSigningOut}
        accessibilityRole="button"
        accessibilityLabel="Sign out"
        accessibilityState={{ disabled: isSigningOut, busy: isSigningOut }}
        className="mt-5 h-11 justify-center px-4"
      >
        {isSigningOut ? (
          <ActivityIndicator color="#6b7280" />
        ) : (
          <Text className="font-poppins text-base text-text-secondary">Sign Out</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

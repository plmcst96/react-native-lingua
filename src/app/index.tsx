import { useClerk, useUser } from "@clerk/expo";
import { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

// Home route (/). Only reachable when signed in — see the guards in _layout.tsx.
// Signed-out users land directly on /onboarding.
export default function Index() {
  const { signOut } = useClerk();
  const { user } = useUser();
  const [isSigningOut, setIsSigningOut] = useState(false);

  // Ending the session flips the guards in _layout.tsx,
  // which then sends the user back to the Sign Up screen.
  async function handleSignOut() {
    setIsSigningOut(true);
    await signOut();
  }

  return (
    <View className="flex-1 items-center justify-center bg-white px-8">
      <Text className="heading--h1 text-lingua-deep-purple">Lingua</Text>
      <Text className="body--md mt-2 text-text-secondary">
        {user?.primaryEmailAddress?.emailAddress}
      </Text>

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={handleSignOut}
        disabled={isSigningOut}
        className="button--gradient mt-8 w-full"
      >
        {isSigningOut ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text className="button__label">Sign Out</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

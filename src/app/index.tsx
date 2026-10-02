import { useClerk, useUser } from "@clerk/expo";
import { router } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

/**
 * Render the signed-in home route with email, language selection, and sign-out.
 * The guards in _layout.tsx send signed-out users to /onboarding on app entry.
 */
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
        onPress={() => router.push("/language-selection")}
        className="button--outline mt-8 w-full px-5"
      >
        <SymbolView
          name={{ ios: "globe", android: "language" }}
          size={22}
          tintColor="#0d132b"
        />
        <Text className="ml-3 font-poppins-medium text-base text-text-primary">
          Choose a language
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={handleSignOut}
        disabled={isSigningOut}
        className="button--gradient mt-4 w-full"
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

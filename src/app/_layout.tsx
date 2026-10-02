import "@/global.css";

import { ClerkProvider, useAuth } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useRef } from "react";

// Keep the splash screen visible until Poppins and Clerk are ready,
// so text never flashes in the system font and the right screen shows first.
SplashScreen.preventAutoHideAsync();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error("Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file");
}

export default function RootLayout() {
  // The names must match the --font-* tokens in src/global.css.
  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Regular": require("@/assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("@/assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("@/assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("@/assets/fonts/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    // tokenCache stores the session in expo-secure-store, so users stay signed in.
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <RootNavigator />
    </ClerkProvider>
  );
}

/**
 * Render routes guarded by sign-in state, or nothing while auth is loading.
 * Hide the splash screen once auth loads and navigate to Sign Up on sign-out.
 */
function RootNavigator() {
  const { isLoaded, isSignedIn } = useAuth();
  const wasSignedIn = useRef(isSignedIn);

  useEffect(() => {
    if (isLoaded) {
      SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  // Signing out from inside the app goes straight to Sign Up.
  // (Opening the app while signed out still starts on onboarding.)
  useEffect(() => {
    if (wasSignedIn.current && !isSignedIn) {
      router.replace("/sign-up");
    }
    wasSignedIn.current = isSignedIn;
  }, [isSignedIn]);

  if (!isLoaded) {
    return null;
  }

  // Protected screens only exist while their guard is true.
  // Signing in or out flips the guards and Expo Router moves the user automatically:
  // signed out → onboarding (or Sign Up right after a sign out), signed in → home (/).
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isSignedIn}>
        <Stack.Screen name="index" />
        <Stack.Screen name="language-selection" />
      </Stack.Protected>

      <Stack.Protected guard={!isSignedIn}>
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  );
}

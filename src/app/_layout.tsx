import "@/global.css";

import { ClerkProvider, useAuth } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useRef } from "react";

import { useLanguageStore } from "@/store/useLanguageStore";

// Keep the splash visible until fonts, saved language and Clerk are ready.
SplashScreen.preventAutoHideAsync();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error("Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file");
}

export default function RootLayout() {
  // Names must match the --font-* tokens in global.css.
  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Regular": require("@/assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("@/assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("@/assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("@/assets/fonts/Poppins-Bold.ttf"),
  });
  const hasHydrated = useLanguageStore((state) => state.hasHydrated);

  if ((!fontsLoaded && !fontError) || !hasHydrated) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <RootNavigator />
    </ClerkProvider>
  );
}

function RootNavigator() {
  const { isLoaded, isSignedIn } = useAuth();
  const wasSignedIn = useRef(isSignedIn);
  const hasLanguage = useLanguageStore((state) => state.selectedLanguage !== null);
  const hadLanguage = useRef(hasLanguage);

  useEffect(() => {
    if (isLoaded) {
      SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  // Signing out goes to Sign Up; a signed-out app launch still starts on onboarding.
  useEffect(() => {
    if (wasSignedIn.current && !isSignedIn) {
      router.replace("/sign-up");
    }
    wasSignedIn.current = isSignedIn;
  }, [isSignedIn]);

  // Home only exists after the guard re-renders, so the first-pick redirect happens here.
  useEffect(() => {
    if (isSignedIn && !hadLanguage.current && hasLanguage) {
      router.replace("/");
    }
    hadLanguage.current = hasLanguage;
  }, [isSignedIn, hasLanguage]);

  if (!isLoaded) {
    return null;
  }

  // When a guard turns false, Expo Router redirects to the first available screen.
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isSignedIn && hasLanguage}>
        <Stack.Screen name="index" />
      </Stack.Protected>

      <Stack.Protected guard={isSignedIn}>
        <Stack.Screen name="language-selection" />
      </Stack.Protected>

      <Stack.Protected guard={!isSignedIn}>
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  );
}

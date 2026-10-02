import "@/global.css";

import { ClerkProvider, useAuth, useUser } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { PostHogProvider } from "posthog-react-native";
import { useEffect, useRef } from "react";

import { posthog } from "@/lib/posthog";
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

  const navigator = <RootNavigator />;

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      {posthog ? (
        <PostHogProvider client={posthog}>{navigator}</PostHogProvider>
      ) : (
        navigator
      )}
    </ClerkProvider>
  );
}

function RootNavigator() {
  const { isLoaded, isSignedIn } = useAuth();
  const { isLoaded: isUserLoaded, user } = useUser();
  const wasSignedIn = useRef(isSignedIn);
  const identifiedUserId = useRef<string | null>(null);
  const hasResolvedPostHogIdentity = useRef(false);
  const hasLanguage = useLanguageStore((state) => state.selectedLanguage !== null);
  const hadLanguage = useRef(hasLanguage);

  useEffect(() => {
    if (isLoaded) {
      SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  // Clerk's user ID is stable, unlike email and names, and persists identity for all later telemetry.
  useEffect(() => {
    if (!isLoaded || !isUserLoaded) {
      return;
    }

    if (!isSignedIn || !user) {
      if (!hasResolvedPostHogIdentity.current || identifiedUserId.current) {
        posthog?.reset();
      }
      identifiedUserId.current = null;
      hasResolvedPostHogIdentity.current = true;
      return;
    }

    if (identifiedUserId.current === user.id) {
      return;
    }

    if (identifiedUserId.current) {
      posthog?.reset();
    }

    posthog?.identify(user.id, {
      $set: {
        ...(user.primaryEmailAddress?.emailAddress
          ? { email: user.primaryEmailAddress.emailAddress }
          : {}),
        ...(user.firstName ? { first_name: user.firstName } : {}),
        ...(user.lastName ? { last_name: user.lastName } : {}),
      },
    });
    identifiedUserId.current = user.id;
    hasResolvedPostHogIdentity.current = true;
  }, [isLoaded, isSignedIn, isUserLoaded, user]);

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
        <Stack.Screen name="(tabs)" />
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

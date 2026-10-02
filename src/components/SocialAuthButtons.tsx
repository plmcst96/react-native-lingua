import { useSSO } from "@clerk/expo";
import { useSignInWithApple } from "@clerk/expo/apple";
import * as AppleAuthentication from "expo-apple-authentication";
import * as WebBrowser from "expo-web-browser";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ImageSourcePropType,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { images } from "@/constants/images";
import { isCancelledError, logClerkError } from "@/lib/clerk";

// Lets the in-app browser hand the SSO result back to the app.
WebBrowser.maybeCompleteAuthSession();

type Provider = "Google" | "Facebook" | "Apple";

const providers: { name: Provider; logo: ImageSourcePropType }[] = [
  { name: "Google", logo: images.logoGoogle },
  { name: "Facebook", logo: images.logoFacebook },
  { name: "Apple", logo: images.logoApple },
];

// Clerk's OAuth strategy name for each button.
const SSO_STRATEGIES = {
  Google: "oauth_google",
  Facebook: "oauth_facebook",
  Apple: "oauth_apple",
} as const;

// "or continue with" divider followed by the Google / Facebook / Apple buttons.
// The same buttons work for sign up and sign in: Clerk creates the account if it doesn't exist yet.
export default function SocialAuthButtons() {
  const { startAppleAuthenticationFlow } = useSignInWithApple();
  const { startSSOFlow } = useSSO();
  const [loadingProvider, setLoadingProvider] = useState<Provider | null>(null);

  async function startFlow(provider: Provider) {
    // Native Apple sheet on iOS, when the device supports it
    // (a simulator without an Apple ID, Expo Go, or a build without the
    // "Sign in with Apple" capability don't — those fall back to the browser).
    if (
      provider === "Apple" &&
      Platform.OS === "ios" &&
      (await AppleAuthentication.isAvailableAsync())
    ) {
      return startAppleAuthenticationFlow();
    }
    // Everything else uses Clerk's in-app browser flow.
    // Google could use a native sheet via useSignInWithGoogle() from "@clerk/expo/google",
    // but that needs the @clerk/expo-google-signin package and your own Google Cloud client IDs.
    return startSSOFlow({ strategy: SSO_STRATEGIES[provider] });
  }

  async function handlePress(provider: Provider) {
    setLoadingProvider(provider);

    try {
      const { createdSessionId, setActive } = await startFlow(provider);

      // Activating the new session signs the user in.
      // The guards in app/_layout.tsx then move them to the home route.
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
      }
    } catch (error) {
      if (!isCancelledError(error)) {
        logClerkError(`${provider} sign-in`, error);
        Alert.alert(`${provider} sign-in failed`, "Please try again in a moment.");
      }
    } finally {
      setLoadingProvider(null);
    }
  }

  return (
    <View>
      <View className="flex-row items-center">
        <View className="h-px flex-1 bg-border" />
        <Text className="mx-3.5 font-poppins text-[15px] leading-[22px] text-text-secondary">
          or continue with
        </Text>
        <View className="h-px flex-1 bg-border" />
      </View>

      <View className="mt-3 gap-[9px]">
        {providers.map((provider) => (
          <TouchableOpacity
            key={provider.name}
            activeOpacity={0.7}
            disabled={loadingProvider !== null}
            onPress={() => handlePress(provider.name)}
            className="button--outline pl-[38px]"
          >
            {loadingProvider === provider.name ? (
              <ActivityIndicator className="size-6" color="#5b3bf6" />
            ) : (
              <Image source={provider.logo} className="size-6" resizeMode="contain" />
            )}
            <Text className="ml-8 font-poppins-medium text-[16px] leading-6 text-text-primary">
              Continue with {provider.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

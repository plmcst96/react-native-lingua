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
import { isAppleUnknownError, isCancelledError, logClerkError } from "@/lib/clerk";

// Lets the in-app browser hand the SSO result back to the app.
WebBrowser.maybeCompleteAuthSession();

type Provider = "Google" | "Facebook" | "Apple";

const providers: { name: Provider; logo: ImageSourcePropType }[] = [
  { name: "Google", logo: images.logoGoogle },
  { name: "Facebook", logo: images.logoFacebook },
  { name: "Apple", logo: images.logoApple },
];

const SSO_STRATEGIES = {
  Google: "oauth_google",
  Facebook: "oauth_facebook",
  Apple: "oauth_apple",
} as const;

// Works for sign up and sign in: Clerk creates the account if it doesn't exist yet.
export default function SocialAuthButtons() {
  const { startAppleAuthenticationFlow } = useSignInWithApple();
  const { startSSOFlow } = useSSO();
  const [loadingProvider, setLoadingProvider] = useState<Provider | null>(null);

  async function startFlow(provider: Provider) {
    if (
      provider === "Apple" &&
      Platform.OS === "ios" &&
      (await AppleAuthentication.isAvailableAsync())
    ) {
      try {
        return await startAppleAuthenticationFlow();
      } catch (error) {
        // Apple error 1000: no Apple Account on the simulator, or the build lacks a valid capability.
        if (!isAppleUnknownError(error)) throw error;
      }
    }
    // A native Google sheet would need @clerk/expo-google-signin and your own Google client IDs.
    return startSSOFlow({ strategy: SSO_STRATEGIES[provider] });
  }

  async function handlePress(provider: Provider) {
    setLoadingProvider(provider);

    try {
      const { createdSessionId, setActive } = await startFlow(provider);

      // The guards in _layout.tsx then move the user to the right screen.
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

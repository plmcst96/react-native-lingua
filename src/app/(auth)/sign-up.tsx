import { useSignUp } from "@clerk/expo";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AuthHeader from "@/components/AuthHeader";
import AuthInput from "@/components/AuthInput";
import SocialAuthButtons from "@/components/SocialAuthButtons";
import VerificationCodeModal from "@/components/VerificationCodeModal";
import { logClerkError } from "@/lib/clerk";
import { posthog } from "@/lib/posthog";

export default function SignUp() {
  const { signUp, fetchStatus } = useSignUp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [codeError, setCodeError] = useState<string | null>(null);

  const isSubmitting = fetchStatus === "fetching" && !isVerifying;

  async function handleSignUp() {
    const { error } = await signUp.password({
      emailAddress: email.trim(),
      password,
    });
    if (error) {
      logClerkError("sign up", error);
      Alert.alert("Couldn't create your account", "Check your email and password and try again.");
      return;
    }

    const { error: sendError } = await signUp.verifications.sendEmailCode();
    if (sendError) {
      logClerkError("send sign-up code", sendError);
      Alert.alert("Couldn't send the code", "Please try again in a moment.");
      return;
    }

    posthog?.capture("sign_up_started");
    setCodeError(null);
    setIsVerifying(true);
  }

  async function handleVerifyCode(code: string) {
    const { error } = await signUp.verifications.verifyEmailCode({ code });
    if (error) {
      logClerkError("verify sign-up code", error);
      setCodeError("That code didn't work. Please try again.");
      return false;
    }

    // The Clerk Dashboard requires fields this screen doesn't collect (e.g. phone number).
    if (signUp.status !== "complete") {
      console.error(
        `[Clerk] sign up not complete: status=${signUp.status}, missingFields=${signUp.missingFields.join(", ")}`,
      );
      setCodeError("We couldn't finish creating your account.");
      return false;
    }

    // The guards in _layout.tsx then move the user to the right screen.
    const { error: finalizeError } = await signUp.finalize();
    if (finalizeError) {
      logClerkError("finalize sign up", finalizeError);
      setCodeError("Something went wrong. Please try again.");
      return false;
    }

    posthog?.capture("sign_up_completed");
    return true;
  }

  async function handleResendCode() {
    setCodeError(null);
    const { error } = await signUp.verifications.sendEmailCode();
    if (error) {
      logClerkError("resend sign-up code", error);
      setCodeError("Couldn't send a new code. Please try again.");
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustKeyboardInsets
        showsVerticalScrollIndicator={false}
      >
        <AuthHeader
          title="Create your account"
          subtitle="Start your language journey today ✨"
        />

        <View className="gap-3.5">
          <AuthInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            textContentType="emailAddress"
          />
          <AuthInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Create a password"
            isPassword
            autoCapitalize="none"
            autoComplete="new-password"
            textContentType="newPassword"
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleSignUp}
          disabled={isSubmitting}
          className="button--gradient mt-[18px]"
        >
          {isSubmitting ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text className="button__label">Sign Up</Text>
          )}
        </TouchableOpacity>

        <View className="mt-6">
          <SocialAuthButtons />
        </View>

        <View className="mt-auto flex-row justify-center pt-8">
          <Text className="font-poppins text-[15px] leading-[22px] text-text-secondary">
            Already have an account?{" "}
          </Text>
          <TouchableOpacity hitSlop={12} onPress={() => router.replace("/sign-in")}>
            <Text className="font-poppins-medium text-[15px] leading-[22px] text-lingua-deep-purple">
              Log in
            </Text>
          </TouchableOpacity>
        </View>

        {/* Clerk's bot protection mounts here on web only */}
        <View nativeID="clerk-captcha" />
      </ScrollView>

      <VerificationCodeModal
        visible={isVerifying}
        email={email}
        error={codeError}
        onClose={() => setIsVerifying(false)}
        onComplete={handleVerifyCode}
        onResend={handleResendCode}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingHorizontal: 32,
    paddingBottom: 20,
  },
});

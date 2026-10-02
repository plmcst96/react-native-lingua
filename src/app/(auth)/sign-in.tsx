import { useSignIn } from "@clerk/expo";
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

export default function SignIn() {
  const { signIn, fetchStatus } = useSignIn();

  const [email, setEmail] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [codeError, setCodeError] = useState<string | null>(null);

  const isSubmitting = fetchStatus === "fetching" && !isVerifying;

  async function handleSignIn() {
    const { error } = await signIn.emailCode.sendCode({
      emailAddress: email.trim(),
    });
    if (error) {
      logClerkError("send sign-in code", error);
      Alert.alert("Couldn't sign you in", "Check your email and try again.");
      return;
    }

    setCodeError(null);
    setIsVerifying(true);
  }

  async function handleVerifyCode(code: string) {
    const { error } = await signIn.emailCode.verifyCode({ code });
    if (error) {
      logClerkError("verify sign-in code", error);
      setCodeError("That code didn't work. Please try again.");
      return false;
    }

    if (signIn.status !== "complete") {
      console.error(`[Clerk] sign in not complete: status=${signIn.status}`);
      setCodeError("We couldn't sign you in. Please try again.");
      return false;
    }

    // The guards in _layout.tsx then move the user to the right screen.
    const { error: finalizeError } = await signIn.finalize();
    if (finalizeError) {
      logClerkError("finalize sign in", finalizeError);
      setCodeError("Something went wrong. Please try again.");
      return false;
    }

    return true;
  }

  async function handleResendCode() {
    setCodeError(null);
    const { error } = await signIn.emailCode.sendCode();
    if (error) {
      logClerkError("resend sign-in code", error);
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
          title="Welcome back"
          subtitle="Log in to keep your streak going ✨"
        />

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

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleSignIn}
          disabled={isSubmitting}
          className="button--gradient mt-[18px]"
        >
          {isSubmitting ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text className="button__label">Sign In</Text>
          )}
        </TouchableOpacity>

        <View className="mt-6">
          <SocialAuthButtons />
        </View>

        <View className="mt-auto flex-row justify-center pt-8">
          <Text className="font-poppins text-[15px] leading-[22px] text-text-secondary">
            Don&apos;t have an account?{" "}
          </Text>
          <TouchableOpacity hitSlop={12} onPress={() => router.replace("/sign-up")}>
            <Text className="font-poppins-medium text-[15px] leading-[22px] text-lingua-deep-purple">
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
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

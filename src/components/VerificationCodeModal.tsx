import { SymbolView } from "expo-symbols";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const CODE_LENGTH = 6;

type VerificationCodeModalProps = {
  visible: boolean;
  email: string;
  // Message from Clerk when the code is wrong or expired.
  error: string | null;
  onClose: () => void;
  // Called as soon as the last digit is typed. Resolves to true if the code was accepted.
  onComplete: (code: string) => Promise<boolean>;
  onResend: () => void;
};

// Bottom sheet asking for the 6-digit code Clerk emailed to the user.
// One invisible TextInput sits on top of the six boxes and holds the real value,
// so typing, deleting and pasting a code all work like a normal input.
export default function VerificationCodeModal({
  visible,
  email,
  error,
  onClose,
  onComplete,
  onResend,
}: VerificationCodeModalProps) {
  const inputRef = useRef<TextInput>(null);
  const [code, setCode] = useState("");
  const [isChecking, setIsChecking] = useState(false);

  async function handleChangeCode(text: string) {
    const digits = text.replace(/[^0-9]/g, "").slice(0, CODE_LENGTH);
    setCode(digits);

    if (digits.length < CODE_LENGTH) return;

    setIsChecking(true);
    const isAccepted = await onComplete(digits);
    setIsChecking(false);

    if (isAccepted) {
      Keyboard.dismiss();
    } else {
      // Wrong code: clear the boxes so the user can try again.
      setCode("");
      inputRef.current?.focus();
    }
  }

  function handleClose() {
    Keyboard.dismiss();
    setCode("");
    onClose();
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onShow={() => inputRef.current?.focus()}
      onRequestClose={handleClose}
    >
      {/* Pushes the sheet up so it always sits right above the keyboard */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
          justifyContent: "flex-end",
          backgroundColor: "rgba(13, 19, 43, 0.45)",
        }}
      >
        {/* Tapping the dimmed background closes the sheet */}
        <Pressable className="absolute inset-0" onPress={handleClose} />

        <View className="rounded-t-[28px] bg-background px-6 pb-8 pt-3">
          <View className="h-1.5 w-11 self-center rounded-full bg-border" />

          <TouchableOpacity
            onPress={handleClose}
            hitSlop={12}
            className="absolute right-5 top-5 size-8 items-center justify-center rounded-full bg-surface"
            accessibilityLabel="Close"
          >
            <SymbolView
              name={{ ios: "xmark", android: "close" }}
              weight="semibold"
              size={14}
              tintColor="#6b7280"
            />
          </TouchableOpacity>

          <Text className="heading--h2 mt-6">Check your email ✉️</Text>
          <Text className="body--md mt-2 text-text-secondary">
            We sent a 6-digit verification code to{" "}
            <Text className="font-poppins-medium text-text-primary">
              {email || "your email"}
            </Text>
            . Enter it below to continue.
          </Text>

          <View className="mt-6 flex-row gap-2.5">
            {Array.from({ length: CODE_LENGTH }, (_, index) => {
              const digit = code[index];
              const isActive = index === code.length;

              return (
                <View
                  key={index}
                  className={`h-14 flex-1 items-center justify-center rounded-2xl ${
                    isActive
                      ? "border-2 border-lingua-deep-purple bg-background"
                      : digit
                        ? "border border-lingua-deep-purple bg-background"
                        : "border border-border bg-surface"
                  }`}
                >
                  <Text className="font-poppins-semibold text-[22px] leading-[30px] text-text-primary">
                    {digit}
                  </Text>
                </View>
              );
            })}

            <TextInput
              ref={inputRef}
              value={code}
              onChangeText={handleChangeCode}
              editable={!isChecking}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              autoComplete="one-time-code"
              maxLength={CODE_LENGTH}
              caretHidden
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                opacity: 0,
              }}
            />
          </View>

          {/* Status: checking spinner, or error message + resend link */}
          <View className="mt-4 min-h-[22px] items-center">
            {isChecking ? (
              <ActivityIndicator color="#5b3bf6" />
            ) : (
              <>
                {error && (
                  <Text className="body--sm mb-2 text-center text-error">
                    {error}
                  </Text>
                )}
                <TouchableOpacity hitSlop={12} onPress={onResend}>
                  <Text className="body--sm font-poppins-medium text-lingua-deep-purple">
                    Resend code
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

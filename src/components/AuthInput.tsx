import { SymbolView } from "expo-symbols";
import { useState } from "react";
import { Text, TextInput, TextInputProps, TouchableOpacity, View } from "react-native";

type AuthInputProps = TextInputProps & {
  label: string;
  isPassword?: boolean;
};

export default function AuthInput({ label, isPassword, ...inputProps }: AuthInputProps) {
  const [isHidden, setIsHidden] = useState(true);

  return (
    <View className={`input ${isPassword ? "pr-14" : ""}`}>
      <Text className="input__label">{label}</Text>

      <TextInput
        {...inputProps}
        secureTextEntry={isPassword && isHidden}
        placeholderTextColor="#9ca3af"
        style={{
          marginTop: 6,
          padding: 0,
          height: 24,
          fontFamily: "Poppins-Regular",
          fontSize: 16,
          color: "#0d132b",
        }}
      />

      {isPassword && (
        <TouchableOpacity
          onPress={() => setIsHidden(!isHidden)}
          hitSlop={12}
          className="absolute right-5 top-[25px]"
          accessibilityLabel={isHidden ? "Show password" : "Hide password"}
        >
          <SymbolView
            name={
              isHidden
                ? { ios: "eye", android: "visibility" }
                : { ios: "eye.slash", android: "visibility_off" }
            }
            size={24}
            tintColor="#5b6478"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

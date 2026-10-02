import { useClerk } from "@clerk/expo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native";

import { getLanguageByCode } from "@/data/languages";
import { useLanguageStore } from "@/store/useLanguageStore";

export default function Index() {
  const { signOut } = useClerk();
  const selectedLanguage = useLanguageStore((state) => state.selectedLanguage);
  const clearSelectedLanguage = useLanguageStore((state) => state.clearSelectedLanguage);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const language = selectedLanguage ? getLanguageByCode(selectedLanguage) : undefined;

  async function handleSignOut() {
    setIsSigningOut(true);
    await signOut();
  }

  // Without a language, the guard in _layout.tsx sends the user to language selection.
  async function handleClearLanguage() {
    clearSelectedLanguage();
    await AsyncStorage.clear();
  }

  return (
    <View className="flex-1 items-center justify-center bg-[#f5f3f4] px-8">
      <Text className="font-poppins-bold text-[30px] leading-9 text-lingua-purple">Lingua</Text>
      {language && (
        <>
          <Image source={{ uri: language.flagUrl }} className="mt-6 size-[74px] rounded-full" />
          <Text className="mt-2 font-poppins-semibold text-[22px] leading-[29px] text-text-primary">
            {language.name}
          </Text>
          <Text className="body--md mt-3 text-text-secondary">{language.nativeName}</Text>
        </>
      )}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => router.push("/language-selection")}
        className="mt-5 h-14 items-center justify-center rounded-2xl bg-lingua-purple px-7"
      >
        <Text className="button__label">Choose a Language</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={handleSignOut}
        disabled={isSigningOut}
        className="mt-5 h-11 justify-center px-4"
      >
        {isSigningOut ? (
          <ActivityIndicator color="#6b7280" />
        ) : (
          <Text className="font-poppins text-base text-text-secondary">Sign Out</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={handleClearLanguage}
        className="mt-[22px] h-11 justify-center px-4"
      >
        <Text className="font-poppins text-base text-[#a96070]">Clear Language (Test)</Text>
      </TouchableOpacity>
    </View>
  );
}

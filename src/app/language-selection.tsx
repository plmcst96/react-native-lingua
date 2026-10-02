import { router } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import LanguageCard from "@/components/LanguageCard";
import { images } from "@/constants/images";
import { languages } from "@/data/languages";
import { useLanguageStore } from "@/store/useLanguageStore";
import type { LanguageCode } from "@/types/learning";

export default function LanguageSelection() {
  const { width } = useWindowDimensions();
  const [query, setQuery] = useState("");
  const savedLanguage = useLanguageStore((state) => state.selectedLanguage);
  const setSelectedLanguage = useLanguageStore((state) => state.setSelectedLanguage);
  const [selectedCode, setSelectedCode] = useState<LanguageCode>(savedLanguage ?? "es");

  const search = query.trim().toLowerCase();
  const visibleLanguages = languages.filter(
    (language) =>
      language.name.toLowerCase().includes(search) ||
      language.nativeName.toLowerCase().includes(search),
  );

  // The earth artwork has empty space around the globe, so it's drawn wider and cropped.
  const earthSize = width * 1.1;

  // Home only exists once a language is saved.
  function goBack() {
    if (router.canGoBack()) {
      router.back();
    } else if (savedLanguage) {
      router.replace("/");
    }
  }

  function handleContinue() {
    const isFirstPick = savedLanguage === null;
    setSelectedLanguage(selectedCode);

    // On a first pick, _layout.tsx redirects to home.
    if (!isFirstPick) {
      goBack();
    }
  }

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View className="h-11 justify-center px-5">
        <TouchableOpacity
          onPress={goBack}
          hitSlop={12}
          className="absolute left-5 z-10 size-11 justify-center"
          accessibilityLabel="Go back"
        >
          <SymbolView
            name={{ ios: "chevron.left", android: "arrow_back_ios_new", web: "arrow_back_ios_new" }}
            weight="semibold"
            size={22}
            tintColor="#0d132b"
          />
        </TouchableOpacity>
        <Text className="text-center font-poppins-medium text-xl text-text-primary">
          Choose a language
        </Text>
      </View>

      <View className="mx-5 mt-4 h-12 flex-row items-center rounded-full border border-border bg-surface px-4">
        <SymbolView
          name={{ ios: "magnifyingglass", android: "search", web: "search" }}
          size={20}
          tintColor="#6b7280"
        />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search languages"
          placeholderTextColor="#6b7280"
          autoCorrect={false}
          returnKeyType="search"
          className="ml-3 flex-1 p-0 font-poppins text-base text-text-primary"
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="px-5">
          <Text className="heading--h4 mt-7">{search ? "Results" : "Popular"}</Text>

          <View className="mt-4 gap-1.5">
            {visibleLanguages.map((language) => (
              <LanguageCard
                key={language.code}
                language={language}
                isSelected={language.code === selectedCode}
                onPress={() => setSelectedCode(language.code)}
              />
            ))}
          </View>

          {visibleLanguages.length === 0 && (
            <Text className="body--md mt-2 text-center text-text-secondary">
              No languages match &quot;{query.trim()}&quot; yet 🌍
            </Text>
          )}

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleContinue}
            className="button--gradient mt-5"
          >
            <Text className="button__label">Continue</Text>
          </TouchableOpacity>
        </View>

        <View
          className="mt-auto items-center overflow-hidden pt-5"
          style={{ height: earthSize * 0.5 }}
        >
          <Image
            source={images.earth}
            style={{ width: earthSize, height: earthSize, marginTop: -earthSize * 0.16 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
  },
});

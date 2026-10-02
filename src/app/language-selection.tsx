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
import type { LanguageCode } from "@/types/learning";

/**
 * Render language choices with Spanish initially selected and selection kept local.
 * Search matches English or native names by case-insensitive substring after
 * trimming whitespace; an empty query shows all languages. Back and Continue
 * return to the previous route, or home when there is no navigation history.
 */
export default function LanguageSelection() {
  const { width } = useWindowDimensions();
  const [query, setQuery] = useState("");
  // Local for now — the Zustand store will remember the choice in a later step.
  const [selectedCode, setSelectedCode] = useState<LanguageCode>("es");

  const search = query.trim().toLowerCase();
  const visibleLanguages = languages.filter(
    (language) =>
      language.name.toLowerCase().includes(search) ||
      language.nativeName.toLowerCase().includes(search),
  );

  // The earth artwork is a square with empty space around the globe,
  // so it's drawn a bit wider than the screen and cropped at the bottom.
  const earthSize = width * 1.1;

  /** Go back when possible; otherwise replace the current route with home. */
  function goBack() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  }

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: "#ffffff" }}>
      {/* Header */}
      <View className="h-11 justify-center px-5">
        <TouchableOpacity
          onPress={goBack}
          hitSlop={12}
          className="absolute left-5 z-10 size-11 justify-center"
          accessibilityLabel="Go back"
        >
          <SymbolView
            name={{ ios: "chevron.left", android: "arrow_back_ios_new" }}
            weight="semibold"
            size={22}
            tintColor="#0d132b"
          />
        </TouchableOpacity>
        <Text className="text-center font-poppins-medium text-xl text-text-primary">
          Choose a language
        </Text>
      </View>

      {/* Search */}
      <View className="mx-5 mt-4 h-12 flex-row items-center rounded-full border border-border bg-surface px-4">
        <SymbolView
          name={{ ios: "magnifyingglass", android: "search" }}
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
          style={{
            flex: 1,
            marginLeft: 12,
            padding: 0,
            fontFamily: "Poppins-Regular",
            fontSize: 16,
            color: "#0d132b",
          }}
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
            onPress={goBack}
            className="button--gradient mt-5"
          >
            <Text className="button__label">Continue</Text>
          </TouchableOpacity>
        </View>

        {/* Earth illustration, pinned to the bottom edge */}
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

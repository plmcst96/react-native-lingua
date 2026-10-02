import { router } from "expo-router";
import { SymbolView } from "expo-symbols";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { images } from "@/constants/images";

type AuthHeaderProps = {
  title: string;
  subtitle: string;
};

// Back button, title, subtitle and the waving fox shared by Sign Up and Sign In.
export default function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  function handleBack() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/onboarding");
    }
  }

  return (
    <View>
      <TouchableOpacity
        onPress={handleBack}
        hitSlop={12}
        className="-ml-1 size-11 justify-center"
        accessibilityLabel="Go back"
      >
        <SymbolView
          name={{ ios: "chevron.left", android: "arrow_back_ios_new" }}
          weight="semibold"
          size={22}
          tintColor="#0d132b"
        />
      </TouchableOpacity>

      <Text className="mt-5 font-poppins-bold text-[28px] leading-[36px] text-text-primary">
        {title}
      </Text>
      <Text className="body--lg mt-3 leading-6 text-text-secondary">
        {subtitle}
      </Text>

      {/* The fox peeks out from behind the first input, so the box clips its body. */}
      <View className="h-[143px] items-center overflow-hidden">
        <View className="h-full w-[329px]">
          <Image
            source={images.mascotAuth}
            className="absolute left-[42px] -top-[17px] size-[228px]"
            // The artwork waves with its right paw; the design waves with the left.
            style={{ transform: [{ scaleX: -1 }] }}
          />

          <Text className="absolute left-[66px] top-[37px] text-[20px] text-[#ffa62b]">
            ✦
          </Text>
          <Text className="absolute left-[254px] top-[45px] text-[16px] text-[#7fa6ff]">
            ✦
          </Text>
          <Text className="absolute left-[242px] top-[75px] text-[18px] text-[#ffd34e]">
            ✦
          </Text>
        </View>
      </View>
    </View>
  );
}

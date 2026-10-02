import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  LayoutChangeEvent,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import SpeechBubble from "@/components/SpeechBubble";
import { images } from "@/constants/images";

// The illustration is drawn on a fixed-size "stage" taken from the design
// (a 393pt-wide phone), then scaled to fit whatever space the device has left.
const STAGE_WIDTH = 393;
const STAGE_HEIGHT = 395;

export default function Onboarding() {
  const [stageScale, setStageScale] = useState(1);

  function handleIllustrationLayout(event: LayoutChangeEvent) {
    const { width, height } = event.nativeEvent.layout;
    setStageScale(Math.min(width / STAGE_WIDTH, height / STAGE_HEIGHT));
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      {/* Logo */}
      <View className="flex-row items-center justify-center">
        <Image source={images.mascotLogo} className="size-[78px]" />
        <Text className="font-poppins-semibold text-[32px] leading-[40px] text-text-primary">
          lingua 
        </Text>
      </View>

      {/* Headline */}
      <View className="mt-8 px-9">
        <Text className="heading--h1 text-[34px] leading-[48px]">
          Your AI language{"\n"}
          <Text className="text-lingua-deep-purple">teacher</Text>.
        </Text>
        <Text className="body--lg mt-2 leading-7 text-text-secondary">
          Real conversations, personalized{"\n"}lessons, anytime, anywhere.
        </Text>
      </View>

      {/* Illustration */}
      <View
        className="flex-1 items-center justify-center"
        onLayout={handleIllustrationLayout}
      >
        <View
          style={{
            width: STAGE_WIDTH,
            height: STAGE_HEIGHT,
            transform: [{ scale: stageScale }],
          }}
        >
          {/* Soft ground shadow under the fox's feet */}
          <View className="absolute left-[104px] top-[368px] h-[22px] w-[184px] rounded-full bg-[rgba(13,19,43,0.06)]" />

          <Image
            source={images.mascotWelcome}
            className="absolute -left-[32px] top-[10px] size-[436px]"
          />

          <SpeechBubble
            text="Hello!"
            tail="right"
            className="absolute left-[37px] top-[21px] -rotate-6"
            colorClassName="bg-[#EAF2FF]"
            textClassName="text-text-primary"
          />
          <SpeechBubble
            text="¡Hola!"
            tail="left"
            className="absolute left-[240px] top-[2px] rotate-6"
            colorClassName="bg-[#F1F0FE]"
            textClassName="text-lingua-deep-purple"
          />
          <SpeechBubble
            text="你好!"
            tail="left"
            className="absolute left-[276px] top-[97px] rotate-6"
            colorClassName="bg-[#FFF1EE]"
            textClassName="text-error"
          />
        </View>
      </View>

      {/* Call to action */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => router.push("/sign-up")}
        className="button--primary mx-6 mb-5"
      >
        <Text className="button__label">Get Started</Text>
        {/* Chevron: a square with two borders, rotated 45° */}
        <View className="absolute right-9 size-[11px] rotate-45 border-r-2 border-t-2 border-white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

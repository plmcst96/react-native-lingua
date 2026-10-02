import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="heading--h1 text-lingua-deep-purple">Lingua</Text>

      <Link href="/onboarding" asChild>
        <TouchableOpacity className="mt-6 rounded-2xl bg-lingua-deep-purple px-6 py-4">
          <Text className="button__label">Open onboarding</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

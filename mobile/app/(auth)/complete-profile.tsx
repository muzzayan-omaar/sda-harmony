import { Text } from "react-native";

import Screen from "@/components/ui/Screen";
import Header from "@/components/ui/Header";

export default function CompleteProfileScreen() {
  return (
    <Screen>
      <Header
        title="Complete Profile"
        showBackButton
      />

      <Text className="text-white mt-10">
        Complete Profile Screen
      </Text>
    </Screen>
  );
}
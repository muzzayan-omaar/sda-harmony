import { Text } from "react-native";

import Screen from "@/components/ui/Screen";
import Header from "@/components/ui/Header";

export default function RegisterScreen() {
  return (
    <Screen>
      <Header
        title="Create Account"
        showBackButton
      />

      <Text className="text-white mt-10">
        Register Screen
      </Text>
    </Screen>
  );
}
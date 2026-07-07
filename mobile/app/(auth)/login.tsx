import { Text } from "react-native";

import Screen from "@/components/ui/Screen";
import Header from "@/components/ui/Header";

export default function LoginScreen() {
  return (
    <Screen>
      <Header
        title="Sign In"
        showBackButton
      />

      <Text className="text-white mt-10">
        Login Screen
      </Text>
    </Screen>
  );
}
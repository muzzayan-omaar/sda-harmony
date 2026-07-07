import { Text } from "react-native";

import Screen from "@/components/ui/Screen";
import Header from "@/components/ui/Header";

export default function Home() {
  return (
    <Screen>
      <Header
        title="Home"
        rightComponent={<Text style={{ color: "white" }}>🔔</Text>}
      />

      <Text className="text-white mt-10">
        Welcome to SDA Harmony
      </Text>
    </Screen>
  );
}
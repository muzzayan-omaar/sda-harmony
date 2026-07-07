import { useState } from "react";
import { Text } from "react-native";

import Screen from "@/components/ui/Screen";
import Input from "@/components/ui/Input";

export default function Home() {
  const [name, setName] = useState("");

  return (
    <Screen>
      <Text className="text-white text-3xl font-bold mb-8 mt-20">
        SDA Harmony
      </Text>

      <Input
        label="Your Name"
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />

      <Text className="text-white mt-6">
        Hello {name || "Guest"}
      </Text>
    </Screen>
  );
}
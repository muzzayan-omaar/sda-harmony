import { View, Text } from "react-native";
import { router } from "expo-router";

import Screen from "@/components/ui/Screen";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";

export default function WelcomeScreen() {
  return (
    <Screen>
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          paddingVertical: 50,
        }}
      >
        <View />

        <View>
          <Logo />

          <Text
            style={{
              color: "#94A3B8",
              textAlign: "center",
              marginTop: 20,
              fontSize: 18,
            }}
          >
            Worship. Listen. Share.
          </Text>
        </View>

        <View>
          <Button
            title="Sign In"
            onPress={() => router.push("/login")}
          />

          <View style={{ height: 16 }} />

          <Button
            title="Create Account"
            onPress={() => router.push("/register")}
          />

          <Text
            style={{
              color: "#64748B",
              textAlign: "center",
              marginTop: 40,
            }}
          >
            Version 1.0.0
          </Text>
        </View>
      </View>
    </Screen>
  );
}
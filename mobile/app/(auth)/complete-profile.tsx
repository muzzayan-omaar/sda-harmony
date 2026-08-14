// app/(auth)/complete-profile.tsx (replace entire file)
import { View, Text } from "react-native";
import { router } from "expo-router";

import Screen from "@/components/ui/Screen";
import Button from "@/components/ui/Button";
import { colors, spacing } from "@/theme";

export default function CompleteProfileScreen() {
  return (
    <Screen>
      <View style={{ marginTop: spacing.xxl, alignItems: "center" }}>
        <Text style={{ fontSize: 56 }}>🎤</Text>

        <Text style={{ color: colors.text, fontSize: 26, fontWeight: "bold", marginTop: spacing.lg, textAlign: "center" }}>
          Your choir account is ready
        </Text>

        <Text style={{ color: colors.textSecondary, marginTop: spacing.md, textAlign: "center", lineHeight: 22 }}>
          A choir dashboard for uploading songs, albums, and requesting verification is coming soon. For now, jump in and explore.
        </Text>

        <View style={{ marginTop: spacing.xxl, width: "100%" }}>
          <Button title="Continue" onPress={() => router.replace("/home")} />
        </View>
      </View>
    </Screen>
  );
}
// app/home.tsx (replace entire file)
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { router } from "expo-router";

import Screen from "@/components/ui/Screen";
import Button from "@/components/ui/Button";
import { colors, spacing } from "@/theme";

import { useAuthStore } from "@/features/auth/store/authStore";
import { authService } from "@/features/auth/services/auth.service";

export default function HomeScreen() {
  const { user, refreshToken, clearSession } = useAuthStore();
  const [meCheck, setMeCheck] = useState<"loading" | "ok" | "error">("loading");

  // app/home.tsx — replace the two useEffect/if blocks with these
  useEffect(() => {
    if (user?.role === "CHOIR") {
      router.replace("/choir/dashboard");
    } else if (user?.role === "ADMIN") {
      router.replace("/admin/dashboard");
    }
  }, [user]);

  async function handleLogout() {
    await authService.logout(refreshToken).catch(() => {});
    clearSession();
    router.replace("/welcome");
  }

  if (user?.role === "CHOIR" || user?.role === "ADMIN") {
    return null; // redirecting
  }

  async function handleLogout() {
    await authService.logout(refreshToken).catch(() => {});
    clearSession();
    router.replace("/welcome");
  }

  if (user?.role === "CHOIR") {
    return null;
  }

  return (
    <Screen>
      <View style={{ marginTop: spacing.xxl }}>
        <Text style={{ color: colors.text, fontSize: 30, fontWeight: "bold" }}>
          Welcome, {user?.fullName}
        </Text>
        <Text style={{ color: colors.textSecondary, marginTop: spacing.sm }}>Listener account</Text>
        <Text style={{ color: colors.textMuted, marginTop: spacing.lg }}>
          Protected /auth/me check: {meCheck === "loading" ? "checking..." : meCheck === "ok" ? "✅ passed" : "❌ failed"}
        </Text>
        <View style={{ marginTop: spacing.xxl }}>
          <Button title="Log Out" onPress={handleLogout} />
        </View>
      </View>
    </Screen>
  );
}
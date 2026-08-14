// app/splash.tsx (replace entire file)
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { router } from "expo-router";

import Screen from "@/components/ui/Screen";
import Logo from "@/components/ui/Logo";
import { colors } from "@/theme";
import { useAuthStore } from "@/features/auth/store/authStore";

export default function SplashScreen() {
  const { hasHydrated, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!hasHydrated) return;

    const timer = setTimeout(() => {
      router.replace(isAuthenticated ? "/home" : "/welcome");
    }, 1200);

    return () => clearTimeout(timer);
  }, [hasHydrated, isAuthenticated]);

  return (
    <Screen>
      <Logo />
      <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 40 }} />
    </Screen>
  );
}
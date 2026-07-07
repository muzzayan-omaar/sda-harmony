import { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { router } from "expo-router";

import Screen from "@/components/ui/Screen";
import Logo from "@/components/ui/Logo";
import { colors } from "@/theme";

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/welcome");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Screen>
      <ScreenContent />
    </Screen>
  );
}

function ScreenContent() {
  return (
    <>
      <Logo />

      <ActivityIndicator
        size="large"
        color={colors.primary}
        style={{
          marginTop: 40,
        }}
      />
    </>
  );
}
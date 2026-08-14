// app/(auth)/login.tsx (replace entire file)
import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";
import { AxiosError } from "axios";

import Screen from "@/components/ui/Screen";
import Header from "@/components/ui/Header";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { colors, spacing } from "@/theme";

import { authService } from "@/features/auth/services/auth.service";
import { useAuthStore } from "@/features/auth/store/authStore";

export default function LoginScreen() {
  const setSession = useAuthStore((s) => s.setSession);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit() {
    setError(null);

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setSubmitting(true);

    try {
      const result = await authService.login({ email: email.trim(), password });

      setSession({
        user: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      });

      router.replace("/home");
    } catch (err) {
      const message =
        err instanceof AxiosError
          ? err.response?.data?.message || "Invalid email or password."
          : "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Screen>
      <Header title="Sign In" showBackButton />

      <View style={{ marginTop: spacing.xl }}>
        <Text style={{ color: colors.text, fontSize: 30, fontWeight: "bold" }}>Welcome Back</Text>
        <Text style={{ color: colors.textSecondary, marginTop: 8, marginBottom: 32 }}>Sign in to continue</Text>

        {error && <Text style={{ color: colors.error, marginBottom: spacing.md }}>{error}</Text>}

        <Input label="Email" placeholder="Enter your email" value={email} onChangeText={setEmail} />
        <Input label="Password" placeholder="Enter your password" value={password} onChangeText={setPassword} secureTextEntry />

        <Button title="Sign In" onPress={handleSubmit} loading={submitting} />

        <View style={{ flexDirection: "row", justifyContent: "center", marginTop: spacing.xl }}>
          <Text style={{ color: colors.textSecondary }}>Don't have an account?</Text>
          <Pressable onPress={() => router.push("/role-selection")}>
            <Text style={{ color: colors.primary, marginLeft: 6, fontWeight: "600" }}>Create Account</Text>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}
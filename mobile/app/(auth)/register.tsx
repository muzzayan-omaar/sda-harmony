// app/(auth)/register.tsx (replace entire file)
import { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { AxiosError } from "axios";

import Screen from "@/components/ui/Screen";
import Header from "@/components/ui/Header";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { colors, spacing } from "@/theme";

import { authService } from "@/features/auth/services/auth.service";
import { useAuthStore } from "@/features/auth/store/authStore";

export default function RegisterScreen() {
  const { role } = useLocalSearchParams<{ role?: "LISTENER" | "CHOIR" }>();
  const setSession = useAuthStore((s) => s.setSession);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!role) {
      router.replace("/role-selection");
    }
  }, [role]);

  if (!role) {
    return null;
  }

  async function handleSubmit() {
    setError(null);

    if (!fullName.trim() || !email.trim() || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setSubmitting(true);

    try {
      const result = await authService.register({
        fullName: fullName.trim(),
        email: email.trim(),
        password,
        role: role!,
      });

      setSession({
        user: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      });

      if (role === "CHOIR") {
        router.replace("/complete-profile");
      } else {
        router.replace("/home");
      }
    } catch (err) {
      const message =
        err instanceof AxiosError
          ? err.response?.data?.message || "Registration failed. Please try again."
          : "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Screen>
      <Header title="Create Account" showBackButton />

      <View style={{ marginTop: spacing.xl }}>
        <Text style={{ color: colors.text, fontSize: 30, fontWeight: "bold" }}>
          Join SDA Harmony
        </Text>

        <Text style={{ color: colors.textSecondary, marginTop: 8, marginBottom: 32 }}>
          {role === "CHOIR" ? "Create your choir account" : "Create your account"}
        </Text>

        {error && <Text style={{ color: colors.error, marginBottom: spacing.md }}>{error}</Text>}

        <Input label="Full Name" placeholder="Enter your full name" value={fullName} onChangeText={setFullName} />
        <Input label="Email" placeholder="Enter your email" value={email} onChangeText={setEmail} />
        <Input label="Password" placeholder="Enter your password" value={password} onChangeText={setPassword} secureTextEntry />
        <Input label="Confirm Password" placeholder="Confirm your password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />

        <Button title="Create Account" onPress={handleSubmit} loading={submitting} />

        <View style={{ flexDirection: "row", justifyContent: "center", marginTop: spacing.xl }}>
          <Text style={{ color: colors.textSecondary }}>Already have an account?</Text>
          <Pressable onPress={() => router.push("/login")}>
            <Text style={{ color: colors.primary, marginLeft: 6, fontWeight: "600" }}>Sign In</Text>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}
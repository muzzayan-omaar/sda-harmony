import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";

import Screen from "@/components/ui/Screen";
import Header from "@/components/ui/Header";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { colors, spacing } from "@/theme";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    console.log({
      email,
      password,
    });
  }

  return (
    <Screen>
      <Header title="Sign In" showBackButton />

      <View style={{ marginTop: spacing.xl }}>
        <Text
          style={{
            color: colors.text,
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          Welcome Back
        </Text>

        <Text
          style={{
            color: colors.textSecondary,
            marginTop: 8,
            marginBottom: 32,
          }}
        >
          Sign in to continue
        </Text>

        <Input
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
        />

        <Input
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Pressable>
          <Text
            style={{
              color: colors.primary,
              textAlign: "right",
              marginBottom: spacing.xl,
            }}
          >
            Forgot Password?
          </Text>
        </Pressable>

        <Button
          title="Sign In"
          onPress={handleLogin}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: spacing.xl,
          }}
        >
          <Text style={{ color: colors.textSecondary }}>
            Don't have an account?
          </Text>

          <Pressable
            onPress={() => router.push("/register")}
          >
            <Text
              style={{
                color: colors.primary,
                marginLeft: 6,
                fontWeight: "600",
              }}
            >
              Create Account
            </Text>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}
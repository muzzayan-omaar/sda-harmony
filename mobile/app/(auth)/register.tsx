import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";

import Screen from "@/components/ui/Screen";
import Header from "@/components/ui/Header";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { colors, spacing } from "@/theme";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  router.push("/role-selection");

  return (
    <Screen>
      <Header title="Create Account" showBackButton />

      <View style={{ marginTop: spacing.xl }}>
        <Text
          style={{
            color: colors.text,
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          Join SDA Harmony
        </Text>

        <Text
          style={{
            color: colors.textSecondary,
            marginTop: 8,
            marginBottom: 32,
          }}
        >
          Create your account
        </Text>

        <Input
          label="Full Name"
          placeholder="Enter your full name"
          value={name}
          onChangeText={setName}
        />

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

        <Input
          label="Confirm Password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <Button
          title="Create Account"
          onPress={() => {
            // Here you can add your registration logic, e.g., API call to register the user
            console.log("Registering user:", { name, email, password, confirmPassword });
            router.push("/role-selection");
          }}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: spacing.xl,
          }}
        >
          <Text style={{ color: colors.textSecondary }}>
            Already have an account?
          </Text>

          <Pressable onPress={() => router.push("/login")}>
            <Text
              style={{
                color: colors.primary,
                marginLeft: 6,
                fontWeight: "600",
              }}
            >
              Sign In
            </Text>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}
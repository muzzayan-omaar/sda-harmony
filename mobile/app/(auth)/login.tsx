import { View, Text } from "react-native";

import Button from "@/components/ui/Button";
import Screen from "@/components/ui/Screen";
import { useAuthStore } from "@/features/auth/store/authStore";

export default function LoginScreen() {
  const { login, user, isAuthenticated } = useAuthStore();

  return (
    <Screen>
      <View style={{ marginTop: 120 }}>
        <Button
          title="Fake Login"
          onPress={() =>
            login({
              id: "1",
              fullName: "Muzzayan Omaar",
              email: "muzzayan@example.com",
              role: "listener",
              verified: true,
            })
          }
        />

        <Text className="text-white mt-8">
          Logged In:
          {" "}
          {isAuthenticated ? "YES" : "NO"}
        </Text>

        <Text className="text-white mt-4">
          {user?.fullName}
        </Text>

        <Text className="text-white">
          {user?.role}
        </Text>
      </View>
    </Screen>
  );
}
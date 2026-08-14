import { Text } from "react-native";
import { router } from "expo-router";
import Screen from "@/components/ui/Screen";
import Header from "@/components/ui/Header";
import Button from "@/components/ui/Button";
import { useAuthStore } from "@/features/auth/store/authStore";

export default function HomeScreen() {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  return (
    <Screen>
      <Header title="Home" />

      <Text className="text-white text-3xl mt-10">
        Welcome,
      </Text>

      <Text className="text-white text-2xl font-bold mt-2">
        {user?.fullName}
      </Text>

      <Text className="text-slate-400 mt-4">
        Role: {user?.role}
      </Text>

      <Button
        title="Logout"
        onPress={() => {
            logout();
            router.replace("/welcome");
        }}
        />
    </Screen>
  );
}
import { View, Text, Pressable } from "react-native";
import useThemeStore from "@/store/themeStore";

export default function Home() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <View
      className={`flex-1 justify-center items-center ${
        theme === "dark" ? "bg-blue-950" : "bg-gray-200"
      }`}
    >
      <Text
        className={`text-3xl font-bold ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
      >
        Theme: {theme}
      </Text>

      <Pressable
        onPress={toggleTheme}
        className="mt-8 bg-blue-600 px-6 py-3 rounded-xl"
      >
        <Text className="text-white font-bold">
          Toggle Theme
        </Text>
      </Pressable>
    </View>
  );
}
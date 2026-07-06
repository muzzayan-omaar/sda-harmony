import { View, Text } from "react-native";
import { colors, typography } from "@/theme";

export default function Home() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: colors.text,
          fontSize: typography.h2,
          fontWeight: "bold",
        }}
      >
        Theme System Ready 🎨
      </Text>
    </View>
  );
}
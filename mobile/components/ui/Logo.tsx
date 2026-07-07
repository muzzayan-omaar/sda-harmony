import { View, Text } from "react-native";
import { colors } from "@/theme";

interface LogoProps {
  size?: number;
}

export default function Logo({ size = 36 }: LogoProps) {
  return (
    <View style={{ alignItems: "center" }}>
      <Text
        style={{
          fontSize: size,
          fontWeight: "bold",
          color: colors.text,
        }}
      >
        SDA Harmony
      </Text>

      <Text
        style={{
          color: colors.textSecondary,
          marginTop: 4,
        }}
      >
        Pure Adventist Music
      </Text>
    </View>
  );
}
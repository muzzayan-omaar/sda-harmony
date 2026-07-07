import { View, Text } from "react-native";
import { colors } from "@/theme";

interface EmptyStateProps {
  title: string;
  description: string;
}

export default function EmptyState({
  title,
  description,
}: EmptyStateProps) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
      }}
    >
      <Text
        style={{
          color: colors.text,
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 8,
          textAlign: "center",
        }}
      >
        {title}
      </Text>

      <Text
        style={{
          color: colors.textSecondary,
          textAlign: "center",
        }}
      >
        {description}
      </Text>
    </View>
  );
}
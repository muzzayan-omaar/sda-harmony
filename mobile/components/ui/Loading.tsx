import { View, ActivityIndicator, Text } from "react-native";
import { colors } from "@/theme";

interface LoadingProps {
  message?: string;
}

export default function Loading({
  message = "Loading...",
}: LoadingProps) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color={colors.primary} />

      <Text
        style={{
          color: colors.text,
          marginTop: 16,
        }}
      >
        {message}
      </Text>
    </View>
  );
}
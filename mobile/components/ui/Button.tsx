import { Pressable, Text, ActivityIndicator } from "react-native";
import { colors, radius, spacing, typography } from "@/theme";

interface ButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export default function Button({
  title,
  onPress,
  loading = false,
  disabled = false,
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={{
        backgroundColor: disabled
          ? "#64748B"
          : colors.primary,

        paddingVertical: spacing.md,

        borderRadius: radius.lg,

        justifyContent: "center",

        alignItems: "center",
      }}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text
          style={{
            color: "white",

            fontSize: typography.body,

            fontWeight: "600",
          }}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}
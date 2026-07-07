import { PropsWithChildren } from "react";
import { View } from "react-native";
import { colors, radius, spacing } from "@/theme";

interface CardProps extends PropsWithChildren {}

export default function Card({ children }: CardProps) {
  return (
    <View
      style={{
        backgroundColor: colors.surface,
        borderRadius: radius.lg,
        padding: spacing.lg,
        borderWidth: 1,
        borderColor: colors.border,
        marginBottom: spacing.lg,
      }}
    >
      {children}
    </View>
  );
}
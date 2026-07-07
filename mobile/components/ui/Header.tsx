import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";
import { colors, spacing, typography } from "@/theme";

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  rightComponent?: React.ReactNode;
}

export default function Header({
  title,
  showBackButton = false,
  rightComponent,
}: HeaderProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: spacing.md,
      }}
    >
      <View style={{ width: 50 }}>
        {showBackButton && (
          <Pressable onPress={() => router.back()}>
            <Text
              style={{
                color: colors.primary,
                fontSize: typography.body,
                fontWeight: "600",
              }}
            >
              ← Back
            </Text>
          </Pressable>
        )}
      </View>

      <Text
        style={{
          color: colors.text,
          fontSize: typography.h3,
          fontWeight: "bold",
        }}
      >
        {title}
      </Text>

      <View style={{ width: 50, alignItems: "flex-end" }}>
        {rightComponent}
      </View>
    </View>
  );
}
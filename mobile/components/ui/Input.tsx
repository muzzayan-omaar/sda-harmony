import { TextInput, View, Text } from "react-native";
import { colors, radius, spacing, typography } from "@/theme";

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
}

export default function Input({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
}: InputProps) {
  return (
    <View style={{ marginBottom: spacing.lg }}>
      {label && (
        <Text
          style={{
            color: colors.text,
            marginBottom: spacing.sm,
            fontSize: typography.small,
            fontWeight: "600",
          }}
        >
          {label}
        </Text>
      )}

      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        style={{
          backgroundColor: colors.surface,
          color: colors.text,
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.md,
          borderRadius: radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          fontSize: typography.body,
        }}
      />
    </View>
  );
}
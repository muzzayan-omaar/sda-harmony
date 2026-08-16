// components/ui/VerifiedBadge.tsx (new file)
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "@/theme";

export default function VerifiedBadge({ size = 14, label }: { size?: number; label?: boolean }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Ionicons name="ribbon" size={size} color={colors.accent} />
      {label && (
        <Text style={{ color: colors.accent, fontSize: size - 2, marginLeft: 4, fontWeight: "600" }}>
          Verified
        </Text>
      )}
    </View>
  );
}
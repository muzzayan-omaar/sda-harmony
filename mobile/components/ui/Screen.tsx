import { PropsWithChildren } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import { colors } from "@/theme";

interface ScreenProps extends PropsWithChildren {
  padded?: boolean;
}

export default function Screen({
  children,
  padded = true,
}: ScreenProps) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: padded ? 20 : 0,
        }}
      >
        {children}
      </View>
    </SafeAreaView>
  );
}
import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";

import Screen from "@/components/ui/Screen";
import Header from "@/components/ui/Header";
import Card from "@/components/ui/Card";
import { colors, spacing } from "@/theme";

export default function RoleSelectionScreen() {
  function selectRole(role: "listener" | "choir") {
    console.log("Selected Role:", role);

    router.push("/complete-profile");
  }

  return (
    <Screen>
      <Header
        title="Choose Role"
        showBackButton
      />

      <View style={{ marginTop: spacing.xl }}>
        <Text
          style={{
            color: colors.text,
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          Choose Your Experience
        </Text>

        <Text
          style={{
            color: colors.textSecondary,
            marginTop: 8,
            marginBottom: spacing.xl,
          }}
        >
          Select how you'll use SDA Harmony.
        </Text>

        <Pressable onPress={() => selectRole("listener")}>
          <Card>
            <Text style={{ fontSize: 42 }}>🎧</Text>

            <Text
              style={{
                color: colors.text,
                fontSize: 22,
                fontWeight: "bold",
                marginTop: 12,
              }}
            >
              Listener
            </Text>

            <Text style={{ color: colors.textSecondary, marginTop: 8 }}>
              • Stream worship music{"\n"}
              • Download songs{"\n"}
              • Create playlists{"\n"}
              • Support choirs
            </Text>
          </Card>
        </Pressable>

        <Pressable onPress={() => selectRole("choir")}>
          <Card>
            <Text style={{ fontSize: 42 }}>🎤</Text>

            <Text
              style={{
                color: colors.text,
                fontSize: 22,
                fontWeight: "bold",
                marginTop: 12,
              }}
            >
              Choir
            </Text>

            <Text style={{ color: colors.textSecondary, marginTop: 8 }}>
              • Upload music{"\n"}
              • Create albums{"\n"}
              • Receive donations{"\n"}
              • Grow your ministry
            </Text>
          </Card>
        </Pressable>
      </View>
    </Screen>
  );
}
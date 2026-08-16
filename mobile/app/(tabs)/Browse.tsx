import { useCallback, useEffect, useState } from "react";
import { View, Text, ScrollView, RefreshControl, Pressable } from "react-native";
import { router } from "expo-router";

import Screen from "@/components/ui/Screen";
import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import Loading from "@/components/ui/Loading";
import VerifiedBadge from "@/components/ui/VerifiedBadge";
import { colors, spacing } from "@/theme";

import api from "@/services/api/client";
import { ENDPOINTS } from "@/services/api/endpoints";

interface PublicChoir {
  id: string;
  name: string;
  bio: string | null;
  location: string | null;
  isVerified: boolean;
}

export default function BrowseScreen() {
  const [choirs, setChoirs] = useState<PublicChoir[]>([]);
  const [loading, setLoading] = useState(true);

  const loadChoirs = useCallback(async () => {
    try {
      const { data } = await api.get(ENDPOINTS.CHOIRS);
      setChoirs(data.choirs);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadChoirs();
  }, [loadChoirs]);

  if (loading) {
    return (
      <Screen>
        <Loading />
      </Screen>
    );
  }

  return (
    <Screen>
      <ScrollView
        refreshControl={<RefreshControl refreshing={loading} onRefresh={loadChoirs} tintColor={colors.primary} />}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginTop: spacing.lg }}>
          <Text style={{ color: colors.text, fontSize: 26, fontWeight: "bold", marginBottom: spacing.lg }}>
            Browse Choirs
          </Text>

          {choirs.length === 0 ? (
            <EmptyState
              title="No choirs yet"
              description="Once choirs have approved songs, they'll show up here to browse."
            />
          ) : (
            choirs.map((choir) => (
              <Pressable key={choir.id} onPress={() => router.push(`/choirs/${choir.id}`)}>
                <Card>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 24,
                      backgroundColor: colors.secondary,
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: spacing.md,
                    }}
                  >
                    <Text style={{ fontSize: 20 }}>🎤</Text>
                  </View>

                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <Text style={{ color: colors.text, fontSize: 16, fontWeight: "600" }}>
                        {choir.name}
                      </Text>
                      {choir.isVerified && (
                        <View style={{ marginLeft: 6 }}>
                          <VerifiedBadge />
                        </View>
                      )}
                    </View>

                    {choir.location && (
                      <Text style={{ color: colors.textSecondary, fontSize: 13, marginTop: 2 }}>
                        📍 {choir.location}
                      </Text>
                    )}
                  </View>
                </View>
              </Card>
              </Pressable>
            ))
          )}
        </View>
      </ScrollView>
    </Screen>
  );
}
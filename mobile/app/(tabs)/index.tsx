import { useCallback, useEffect, useState } from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";

import Screen from "@/components/ui/Screen";
import EmptyState from "@/components/ui/EmptyState";
import Loading from "@/components/ui/Loading";
import MiniPlayer from "@/components/player/MiniPlayer";
import SongRow from "@/components/content/SongRow";
import { colors, spacing } from "@/theme";

import { useAuthStore } from "@/features/auth/store/authStore";
import { contentService } from "@/features/content/services/content.service";
import { Song } from "@/features/content/types/content";
import { usePlayerStore } from "@/store/playerStore";
import { useFavoritesStore } from "@/store/favoritesStore";

export default function HomeScreen() {
  const { user } = useAuthStore();
  const { currentSong } = usePlayerStore();
  const loadFavorites = useFavoritesStore((s) => s.load);

  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  const loadSongs = useCallback(async () => {
    try {
      const result = await contentService.getPublicSongs();
      setSongs(result);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSongs();
    loadFavorites();
  }, [loadSongs, loadFavorites]);

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
        refreshControl={<RefreshControl refreshing={loading} onRefresh={loadSongs} tintColor={colors.primary} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: currentSong ? 90 : 20 }}
      >
        <View style={{ marginTop: spacing.lg }}>
          <Text style={{ color: colors.text, fontSize: 26, fontWeight: "bold" }}>
            Welcome, {user?.fullName?.split(" ")[0]}
          </Text>
          <Text style={{ color: colors.textSecondary, marginTop: 4, marginBottom: spacing.lg }}>
            SDA worship music, Uganda first
          </Text>

          <Text style={{ color: colors.text, fontSize: 20, fontWeight: "bold", marginBottom: spacing.sm }}>
            Latest Songs
          </Text>

          {songs.length === 0 ? (
            <EmptyState
              title="No songs yet"
              description="Approved songs from choirs will appear here once they're live."
            />
          ) : (
            songs.map((song) => <SongRow key={song.id} song={song} />)
          )}
        </View>
      </ScrollView>

      <MiniPlayer />
    </Screen>
  );
}
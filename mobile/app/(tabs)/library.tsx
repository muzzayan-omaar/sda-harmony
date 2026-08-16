import { useCallback, useEffect, useState } from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";

import Screen from "@/components/ui/Screen";
import EmptyState from "@/components/ui/EmptyState";
import Loading from "@/components/ui/Loading";
import MiniPlayer from "@/components/player/MiniPlayer";
import SongRow from "@/components/content/SongRow";
import { colors, spacing } from "@/theme";

import { contentService } from "@/features/content/services/content.service";
import { Song } from "@/features/content/types/content";
import { usePlayerStore } from "@/store/playerStore";
import { useFavoritesStore } from "@/store/favoritesStore";
import { useDownloadStore } from "@/store/downloadStore";

export default function LibraryScreen() {
  const { currentSong } = usePlayerStore();
  const likedIds = useFavoritesStore((s) => s.likedIds);
  const downloads = useDownloadStore((s) => s.downloads);

  const [favoriteSongs, setFavoriteSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = useCallback(async () => {
    try {
      const result = await contentService.getLikedSongs();
      setFavoriteSongs(result);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFavorites();
  }, [likedIds]);

  // Downloaded songs are read straight from local device storage — no
  // network call, so this section still works with no connectivity at all.
  const downloadedSongs = Object.values(downloads)
    .sort((a, b) => b.downloadedAt - a.downloadedAt)
    .map((entry) => entry.song);

  return (
    <Screen>
      <ScrollView
        refreshControl={<RefreshControl refreshing={loading} onRefresh={loadFavorites} tintColor={colors.primary} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: currentSong ? 90 : 20 }}
      >
        <View style={{ marginTop: spacing.lg }}>
          <Text style={{ color: colors.text, fontSize: 26, fontWeight: "bold", marginBottom: spacing.lg }}>
            Your Library
          </Text>

          <Text style={{ color: colors.text, fontSize: 18, fontWeight: "bold", marginBottom: spacing.sm }}>
            Downloaded ({downloadedSongs.length})
          </Text>

          {downloadedSongs.length === 0 ? (
            <EmptyState
              title="Nothing downloaded"
              description="Tap the download icon on any song to save it for offline listening."
            />
          ) : (
            downloadedSongs.map((song) => <SongRow key={song.id} song={song} />)
          )}

          <Text style={{ color: colors.text, fontSize: 18, fontWeight: "bold", marginTop: spacing.xl, marginBottom: spacing.sm }}>
            Favorites
          </Text>

          {loading ? (
            <Loading />
          ) : favoriteSongs.length === 0 ? (
            <EmptyState title="No favorites yet" description="Tap the heart on any song to save it here." />
          ) : (
            favoriteSongs.map((song) => <SongRow key={song.id} song={song} />)
          )}
        </View>
      </ScrollView>

      <MiniPlayer />
    </Screen>
  );
}
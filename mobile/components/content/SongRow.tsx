import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Card from "@/components/ui/Card";
import VerifiedBadge from "@/components/ui/VerifiedBadge";
import { colors, spacing } from "@/theme";

import { Song } from "@/features/content/types/content";
import { usePlayerStore } from "@/store/playerStore";
import { useFavoritesStore } from "@/store/favoritesStore";

export default function SongRow({ song }: { song: Song }) {
  const { currentSong, playSong } = usePlayerStore();
  const { isLiked, toggle } = useFavoritesStore();

  const liked = isLiked(song.id);
  const isCurrent = currentSong?.id === song.id;

  return (
    <Pressable onPress={() => playSong(song)}>
      <Card>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              backgroundColor: colors.primary,
              alignItems: "center",
              justifyContent: "center",
              marginRight: spacing.md,
            }}
          >
            <Text style={{ fontSize: 18 }}>{isCurrent ? "🎶" : "🎵"}</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={{ color: colors.text, fontSize: 16, fontWeight: "600" }} numberOfLines={1}>
              {song.title}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 2 }}>
              <Text style={{ color: colors.textSecondary, fontSize: 13 }} numberOfLines={1}>
                {song.choir?.name || "Unknown choir"}
              </Text>
              {song.choir?.isVerified && (
                <View style={{ marginLeft: 6 }}>
                  <VerifiedBadge size={12} />
                </View>
              )}
            </View>
          </View>

          <Pressable
            hitSlop={10}
            onPress={(e) => {
              e.stopPropagation();
              toggle(song.id);
            }}
            style={{ paddingLeft: spacing.sm }}
          >
            <Ionicons
              name={liked ? "heart" : "heart-outline"}
              size={22}
              color={liked ? colors.error : colors.textMuted}
            />
          </Pressable>
        </View>
      </Card>
    </Pressable>
  );
}
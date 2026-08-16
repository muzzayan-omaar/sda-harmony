import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing } from "@/theme";

type MiniPlayerProps = {
  title?: string;
  artist?: string;
  artwork?: string | null;
  isPlaying?: boolean;
  onPress?: () => void;
  onPlayPause?: () => void;
};

export default function MiniPlayer({
  title = "No song playing",
  artist = "Unknown artist",
  artwork,
  isPlaying = false,
  onPress,
  onPlayPause,
}: MiniPlayerProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.container}
    >
      {/* Artwork */}
      <View style={styles.artwork}>
        {artwork ? (
          <Image source={{ uri: artwork }} style={styles.artworkImage} />
        ) : (
          <Ionicons name="musical-notes" size={22} color={colors.textSecondary} />
        )}
      </View>

      {/* Song info */}
      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
        <Text numberOfLines={1} style={styles.artist}>
          {artist}
        </Text>
      </View>

      {/* Play / Pause button */}
      <TouchableOpacity onPress={onPlayPause} style={styles.playButton}>
        <Ionicons
          name={isPlaying ? "pause" : "play"}
          size={26}
          color={colors.text}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card || "#1e1e1e",
    paddingHorizontal: spacing.md || 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.08)",
  },
  artwork: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.08)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    overflow: "hidden",
  },
  artworkImage: {
    width: "100%",
    height: "100%",
  },
  info: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    color: colors.text || "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  artist: {
    color: colors.textSecondary || "#aaa",
    fontSize: 12,
    marginTop: 2,
  },
  playButton: {
    padding: 8,
  },
});
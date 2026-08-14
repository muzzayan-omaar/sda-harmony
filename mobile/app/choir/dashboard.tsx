import { useCallback, useEffect, useState } from "react";
import { View, Text, ScrollView, RefreshControl, Alert } from "react-native";
import { router } from "expo-router";

import Screen from "@/components/ui/Screen";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import { colors, spacing } from "@/theme";

import { useAuthStore } from "@/features/auth/store/authStore";
import { authService } from "@/features/auth/services/auth.service";
import { contentService } from "@/features/content/services/content.service";
import { Song, Album, ChoirProfile } from "@/features/content/types/content";

export default function ChoirDashboardScreen() {
  const { refreshToken, clearSession } = useAuthStore();

  const [profile, setProfile] = useState<ChoirProfile | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [requestingVerification, setRequestingVerification] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const [profileRes, songsRes, albumsRes] = await Promise.all([
        contentService.getMyChoirProfile(),
        contentService.getMySongs(),
        contentService.getMyAlbums(),
      ]);
      setProfile(profileRes);
      setSongs(songsRes);
      setAlbums(albumsRes);
    } finally {
      setLoading(false);
    }
  }, []);

  // Reload on mount. Pull-to-refresh (below) covers reloading after coming
  // back from "Upload Song" — screen re-mounts are avoided on purpose here
  // since expo-router's focus-effect export varies by version.
  useEffect(() => {
    loadData();
  }, [loadData]);

  async function handleLogout() {
    await authService.logout(refreshToken).catch(() => {});
    clearSession();
    router.replace("/welcome");
  }

  async function handleRequestVerification() {
    setRequestingVerification(true);
    try {
      await contentService.requestVerification();
      Alert.alert("Request sent", "An admin will review your choir shortly.");
    } catch (err: any) {
      Alert.alert("Couldn't send request", err?.response?.data?.message || "Please try again.");
    } finally {
      setRequestingVerification(false);
    }
  }

  const pendingCount =
    songs.filter((s) => s.status === "PENDING").length +
    albums.filter((a) => a.status === "PENDING").length;

  return (
    <Screen>
      <ScrollView
        refreshControl={<RefreshControl refreshing={loading} onRefresh={loadData} tintColor={colors.primary} />}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginTop: spacing.lg }}>
          <Text style={{ color: colors.text, fontSize: 28, fontWeight: "bold" }}>
            {profile?.name || "Choir Dashboard"}
          </Text>

          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 6 }}>
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: profile?.isVerified ? colors.success : colors.warning,
                marginRight: 6,
              }}
            />
            <Text style={{ color: colors.textSecondary }}>
              {profile?.isVerified ? "Verified choir" : "Not yet verified"}
            </Text>
          </View>

          {!profile?.isVerified && (
            <View style={{ marginTop: spacing.sm, alignSelf: "flex-start" }}>
              <Button
                title="Request Verification"
                onPress={handleRequestVerification}
                loading={requestingVerification}
              />
            </View>
          )}

          {pendingCount > 0 && (
            <Text style={{ color: colors.accent, marginTop: spacing.sm }}>
              {pendingCount} item{pendingCount > 1 ? "s" : ""} awaiting admin approval
            </Text>
          )}

          <View style={{ marginTop: spacing.xl, flexDirection: "row", gap: spacing.md }}>
            <View style={{ flex: 1 }}>
              <Button title="Upload Song" onPress={() => router.push("/choir/upload-song")} />
            </View>
            <View style={{ flex: 1 }}>
              <Button title="New Album" onPress={() => router.push("/choir/create-album")} />
            </View>
          </View>

          <Text style={{ color: colors.text, fontSize: 20, fontWeight: "bold", marginTop: spacing.xxl }}>
            My Songs ({songs.length})
          </Text>

          {songs.length === 0 ? (
            <EmptyState title="No songs yet" description="Upload your first song to get started." />
          ) : (
            songs.map((song) => (
              <Card key={song.id}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                  <Text style={{ color: colors.text, fontSize: 16, fontWeight: "600", flex: 1 }}>
                    {song.title}
                  </Text>
                  <StatusPill status={song.status} />
                </View>
              </Card>
            ))
          )}

          <Text style={{ color: colors.text, fontSize: 20, fontWeight: "bold", marginTop: spacing.xl }}>
            My Albums ({albums.length})
          </Text>

          {albums.length === 0 ? (
            <EmptyState title="No albums yet" description="Group your songs into an album." />
          ) : (
            albums.map((album) => (
              <Card key={album.id}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                  <Text style={{ color: colors.text, fontSize: 16, fontWeight: "600", flex: 1 }}>
                    {album.title}
                  </Text>
                  <StatusPill status={album.status} />
                </View>
              </Card>
            ))
          )}

          <View style={{ marginTop: spacing.xxl, marginBottom: spacing.xl }}>
            <Button title="Log Out" onPress={handleLogout} />
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

function StatusPill({ status }: { status: "PENDING" | "APPROVED" | "REJECTED" }) {
  const map = {
    PENDING: { bg: colors.warning, label: "Pending" },
    APPROVED: { bg: colors.success, label: "Live" },
    REJECTED: { bg: colors.error, label: "Rejected" },
  } as const;

  const { bg, label } = map[status];

  return (
    <View style={{ backgroundColor: bg, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 }}>
      <Text style={{ color: "#0A0E1A", fontSize: 12, fontWeight: "700" }}>{label}</Text>
    </View>
  );
}

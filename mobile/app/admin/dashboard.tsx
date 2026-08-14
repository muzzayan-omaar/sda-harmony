// app/admin/dashboard.tsx (new file)
import { useCallback, useEffect, useState } from "react";
import { View, Text, ScrollView, RefreshControl, Pressable, Alert } from "react-native";
import { router } from "expo-router";

import Screen from "@/components/ui/Screen";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import Loading from "@/components/ui/Loading";
import { colors, spacing } from "@/theme";

import { useAuthStore } from "@/features/auth/store/authStore";
import { authService } from "@/features/auth/services/auth.service";
import { adminService } from "@/features/admin/services/admin.service";
import { PendingReview } from "@/features/admin/types/admin";

export default function AdminDashboardScreen() {
  const { refreshToken, clearSession } = useAuthStore();

  const [data, setData] = useState<PendingReview | null>(null);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      const result = await adminService.getPending();
      setData(result);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function handleLogout() {
    await authService.logout(refreshToken).catch(() => {});
    clearSession();
    router.replace("/welcome");
  }

  async function handleReviewSong(id: string, approve: boolean) {
    setBusyId(id);
    try {
      await adminService.reviewSong(id, approve);
      await loadData();
    } catch {
      Alert.alert("Error", "Could not update this song.");
    } finally {
      setBusyId(null);
    }
  }

  async function handleReviewAlbum(id: string, approve: boolean) {
    setBusyId(id);
    try {
      await adminService.reviewAlbum(id, approve);
      await loadData();
    } catch {
      Alert.alert("Error", "Could not update this album.");
    } finally {
      setBusyId(null);
    }
  }

  async function handleReviewVerification(id: string, approve: boolean) {
    setBusyId(id);
    try {
      await adminService.reviewChoirVerification(id, approve);
      await loadData();
    } catch {
      Alert.alert("Error", "Could not update this request.");
    } finally {
      setBusyId(null);
    }
  }

  if (loading && !data) {
    return (
      <Screen>
        <Loading />
      </Screen>
    );
  }

  const totalPending =
    (data?.songs.length ?? 0) + (data?.albums.length ?? 0) + (data?.choirVerifications.length ?? 0);

  return (
    <Screen>
      <ScrollView
        refreshControl={<RefreshControl refreshing={loading} onRefresh={loadData} tintColor={colors.primary} />}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginTop: spacing.lg }}>
          <Text style={{ color: colors.text, fontSize: 28, fontWeight: "bold" }}>Admin Review</Text>
          <Text style={{ color: colors.textSecondary, marginTop: 6 }}>
            {totalPending} item{totalPending === 1 ? "" : "s"} awaiting review
          </Text>

          {totalPending === 0 && (
            <EmptyState title="All caught up" description="No pending songs, albums, or verification requests." />
          )}

          {(data?.choirVerifications.length ?? 0) > 0 && (
            <Section title="Choir Verification Requests">
              {data!.choirVerifications.map((req) => (
                <Card key={req.id}>
                  <Text style={{ color: colors.text, fontSize: 16, fontWeight: "600" }}>{req.choir.name}</Text>
                  <ReviewButtons
                    disabled={busyId === req.id}
                    onApprove={() => handleReviewVerification(req.id, true)}
                    onReject={() => handleReviewVerification(req.id, false)}
                  />
                </Card>
              ))}
            </Section>
          )}

          {(data?.albums.length ?? 0) > 0 && (
            <Section title="Pending Albums">
              {data!.albums.map((album) => (
                <Card key={album.id}>
                  <Text style={{ color: colors.text, fontSize: 16, fontWeight: "600" }}>{album.title}</Text>
                  <Text style={{ color: colors.textSecondary, marginTop: 2 }}>by {album.choir.name}</Text>
                  <ReviewButtons
                    disabled={busyId === album.id}
                    onApprove={() => handleReviewAlbum(album.id, true)}
                    onReject={() => handleReviewAlbum(album.id, false)}
                  />
                </Card>
              ))}
            </Section>
          )}

          {(data?.songs.length ?? 0) > 0 && (
            <Section title="Pending Songs">
              {data!.songs.map((song) => (
                <Card key={song.id}>
                  <Text style={{ color: colors.text, fontSize: 16, fontWeight: "600" }}>{song.title}</Text>
                  <Text style={{ color: colors.textSecondary, marginTop: 2 }}>by {song.choir.name}</Text>
                  <ReviewButtons
                    disabled={busyId === song.id}
                    onApprove={() => handleReviewSong(song.id, true)}
                    onReject={() => handleReviewSong(song.id, false)}
                  />
                </Card>
              ))}
            </Section>
          )}

          <View style={{ marginTop: spacing.xxl, marginBottom: spacing.xl }}>
            <Button title="Log Out" onPress={handleLogout} />
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={{ marginTop: spacing.xl }}>
      <Text style={{ color: colors.text, fontSize: 18, fontWeight: "bold", marginBottom: spacing.sm }}>
        {title}
      </Text>
      {children}
    </View>
  );
}

function ReviewButtons({ disabled, onApprove, onReject }: { disabled: boolean; onApprove: () => void; onReject: () => void }) {
  return (
    <View style={{ flexDirection: "row", gap: spacing.sm, marginTop: spacing.md }}>
      <Pressable
        disabled={disabled}
        onPress={onApprove}
        style={{ flex: 1, backgroundColor: colors.success, paddingVertical: 10, borderRadius: 10, alignItems: "center", opacity: disabled ? 0.6 : 1 }}
      >
        <Text style={{ color: "#0A0E1A", fontWeight: "700" }}>Approve</Text>
      </Pressable>

      <Pressable
        disabled={disabled}
        onPress={onReject}
        style={{ flex: 1, backgroundColor: colors.error, paddingVertical: 10, borderRadius: 10, alignItems: "center", opacity: disabled ? 0.6 : 1 }}
      >
        <Text style={{ color: "#FFFFFF", fontWeight: "700" }}>Reject</Text>
      </Pressable>
    </View>
  );
}
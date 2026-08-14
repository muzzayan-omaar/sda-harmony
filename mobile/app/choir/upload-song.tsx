// app/choir/upload-song.tsx (new file)
import { useEffect, useState } from "react";
import { View, Text, Pressable, ScrollView, Alert } from "react-native";
import { router } from "expo-router";
import * as DocumentPicker from "expo-document-picker";

import Screen from "@/components/ui/Screen";
import Header from "@/components/ui/Header";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { colors, spacing, radius } from "@/theme";

import { uploadService } from "@/features/content/services/upload.service";
import { contentService } from "@/features/content/services/content.service";
import { Album } from "@/features/content/types/content";

export default function UploadSongScreen() {
  const [title, setTitle] = useState("");
  const [audioFile, setAudioFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    contentService.getMyAlbums().then(setAlbums).catch(() => {});
  }, []);

  async function pickAudio() {
    const result = await DocumentPicker.getDocumentAsync({
      type: "audio/*",
      copyToCacheDirectory: true,
    });

    if (!result.canceled && result.assets[0]) {
      setAudioFile(result.assets[0]);
    }
  }

  async function handleSubmit() {
    setError(null);

    if (!title.trim()) {
      setError("Song title is required.");
      return;
    }

    if (!audioFile) {
      setError("Please select an audio file.");
      return;
    }

    setSubmitting(true);

    try {
      const audioUrl = await uploadService.uploadToCloudinary(
        { uri: audioFile.uri, name: audioFile.name, mimeType: audioFile.mimeType ?? "audio/mpeg" },
        "sda-harmony/songs"
      );

      await contentService.createSong({
        title: title.trim(),
        audioUrl,
        albumId: selectedAlbumId ?? undefined,
      });

      Alert.alert("Song uploaded", "Your song is pending admin approval.");
      router.replace("/choir/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Screen>
      <Header title="Upload Song" showBackButton />

      <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: spacing.lg }}>
        {error && <Text style={{ color: colors.error, marginBottom: spacing.md }}>{error}</Text>}

        <Input label="Song Title" placeholder="e.g. Great Is Thy Faithfulness" value={title} onChangeText={setTitle} />

        <Text style={{ color: colors.text, fontWeight: "600", marginBottom: spacing.sm }}>Audio File</Text>

        <Pressable
          onPress={pickAudio}
          style={{
            padding: spacing.lg, borderRadius: radius.md, backgroundColor: colors.surface,
            borderWidth: 1, borderColor: audioFile ? colors.secondaryLight : colors.border,
            marginBottom: spacing.lg,
          }}
        >
          <Text style={{ color: audioFile ? colors.secondaryLight : colors.textSecondary }}>
            {audioFile ? `🎵 ${audioFile.name}` : "Tap to select an audio file (MP3, WAV, M4A)"}
          </Text>
        </Pressable>

        {albums.length > 0 && (
          <>
            <Text style={{ color: colors.text, fontWeight: "600", marginBottom: spacing.sm }}>
              Add to Album (optional)
            </Text>

            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm, marginBottom: spacing.lg }}>
              <Pressable
                onPress={() => setSelectedAlbumId(null)}
                style={{
                  paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: radius.full,
                  backgroundColor: selectedAlbumId === null ? colors.primary : colors.surface,
                }}
              >
                <Text style={{ color: colors.text }}>Single (no album)</Text>
              </Pressable>

              {albums.map((album) => (
                <Pressable
                  key={album.id}
                  onPress={() => setSelectedAlbumId(album.id)}
                  style={{
                    paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: radius.full,
                    backgroundColor: selectedAlbumId === album.id ? colors.primary : colors.surface,
                  }}
                >
                  <Text style={{ color: colors.text }}>{album.title}</Text>
                </Pressable>
              ))}
            </View>
          </>
        )}

        <Button title="Upload Song" onPress={handleSubmit} loading={submitting} />
        <View style={{ height: spacing.xxl }} />
      </ScrollView>
    </Screen>
  );
}
// app/choir/create-album.tsx (new file)
import { useState } from "react";
import { View, Text, Image, Pressable, Alert } from "react-native";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";

import Screen from "@/components/ui/Screen";
import Header from "@/components/ui/Header";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { colors, spacing, radius } from "@/theme";

import { uploadService } from "@/features/content/services/upload.service";
import { contentService } from "@/features/content/services/content.service";

export default function CreateAlbumScreen() {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [cover, setCover] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function pickCover() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.8,
      aspect: [1, 1],
      allowsEditing: true,
    });

    if (!result.canceled && result.assets[0]) {
      setCover(result.assets[0]);
    }
  }

  async function handleSubmit() {
    setError(null);

    if (!title.trim()) {
      setError("Album title is required.");
      return;
    }

    setSubmitting(true);

    try {
      let coverUrl: string | undefined;

      if (cover) {
        coverUrl = await uploadService.uploadToCloudinary(
          { uri: cover.uri, name: "cover.jpg", mimeType: cover.mimeType ?? "image/jpeg" },
          "sda-harmony/covers"
        );
      }

      await contentService.createAlbum({
        title: title.trim(),
        genre: genre.trim() || undefined,
        coverUrl,
      });

      Alert.alert("Album created", "Your album is pending admin approval.");
      router.replace("/choir/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Screen>
      <Header title="New Album" showBackButton />

      <View style={{ marginTop: spacing.lg }}>
        {error && <Text style={{ color: colors.error, marginBottom: spacing.md }}>{error}</Text>}

        <Pressable
          onPress={pickCover}
          style={{
            width: 140, height: 140, borderRadius: radius.md,
            backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
            alignItems: "center", justifyContent: "center", alignSelf: "center",
            marginBottom: spacing.lg, overflow: "hidden",
          }}
        >
          {cover ? (
            <Image source={{ uri: cover.uri }} style={{ width: "100%", height: "100%" }} />
          ) : (
            <Text style={{ color: colors.textSecondary, textAlign: "center", padding: spacing.sm }}>
              Tap to add{"\n"}cover art
            </Text>
          )}
        </Pressable>

        <Input label="Album Title" placeholder="e.g. Songs of Zion" value={title} onChangeText={setTitle} />
        <Input label="Genre (optional)" placeholder="e.g. Hymns, Gospel" value={genre} onChangeText={setGenre} />

        <Button title="Create Album" onPress={handleSubmit} loading={submitting} />
      </View>
    </Screen>
  );
}
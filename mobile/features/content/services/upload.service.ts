// features/content/services/upload.service.ts (replace entire file)
import { Platform } from "react-native";

import api from "@/services/api/client";
import { ENDPOINTS } from "@/services/api/endpoints";
import { UploadSignature } from "../types/content";

type UploadFolder = "sda-harmony/songs" | "sda-harmony/covers" | "sda-harmony/profiles";

interface PickedFile {
  uri: string;
  name?: string | null;
  mimeType?: string | null;
}

export const uploadService = {
  async getSignature(folder: UploadFolder): Promise<UploadSignature> {
    const { data } = await api.get<{ success: boolean } & UploadSignature>(
      `${ENDPOINTS.UPLOADS}/signature`,
      { params: { folder } }
    );
    return data;
  },

  async uploadToCloudinary(file: PickedFile, folder: UploadFolder): Promise<string> {
    const sig = await this.getSignature(folder);

    const formData = new FormData();

    if (Platform.OS === "web") {
      // Web's FormData needs a real Blob/File — the {uri, name, type}
      // shortcut only works with React Native's native FormData polyfill
      // on iOS/Android. On web the uri is a blob:// reference we fetch first.
      const fileResponse = await fetch(file.uri);
      const blob = await fileResponse.blob();
      formData.append("file", blob, file.name || "upload");
    } else {
      // @ts-expect-error React Native's native FormData accepts this file shape.
      formData.append("file", {
        uri: file.uri,
        name: file.name || "upload",
        type: file.mimeType || "application/octet-stream",
      });
    }

    formData.append("api_key", sig.apiKey);
    formData.append("timestamp", String(sig.timestamp));
    formData.append("signature", sig.signature);
    formData.append("folder", sig.folder);

    const resourceType = folder === "sda-harmony/songs" ? "video" : "image";

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${sig.cloudName}/${resourceType}/upload`,
      { method: "POST", body: formData }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error?.message || "Upload failed.");
    }

    return result.secure_url;
  },
};
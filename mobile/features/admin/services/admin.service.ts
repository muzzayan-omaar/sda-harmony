// features/admin/services/admin.service.ts (new file)
import api from "@/services/api/client";
import { PendingReview } from "../types/admin";

export const adminService = {
  async getPending(): Promise<PendingReview> {
    const { data } = await api.get("/admin/pending");
    return { songs: data.songs, albums: data.albums, choirVerifications: data.choirVerifications };
  },

  async reviewSong(id: string, approve: boolean): Promise<void> {
    await api.post(`/admin/songs/${id}/review`, { approve });
  },

  async reviewAlbum(id: string, approve: boolean): Promise<void> {
    await api.post(`/admin/albums/${id}/review`, { approve });
  },

  async reviewChoirVerification(id: string, approve: boolean): Promise<void> {
    await api.post(`/admin/choir-verifications/${id}/review`, { approve });
  },
};
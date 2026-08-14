// features/content/services/content.service.ts (new file)
import api from "@/services/api/client";
import { ENDPOINTS } from "@/services/api/endpoints";
import { Album, Song, ChoirProfile } from "../types/content";

export const contentService = {
  async getMyChoirProfile(): Promise<ChoirProfile> {
    const { data } = await api.get(`${ENDPOINTS.CHOIRS}/me`);
    return data.choir;
  },

  async updateMyChoirProfile(input: Partial<ChoirProfile>): Promise<ChoirProfile> {
    const { data } = await api.patch(`${ENDPOINTS.CHOIRS}/me`, input);
    return data.choir;
  },

  async createAlbum(input: { title: string; coverUrl?: string; genre?: string }): Promise<Album> {
    const { data } = await api.post(ENDPOINTS.ALBUMS, input);
    return data.album;
  },

  async getMyAlbums(): Promise<Album[]> {
    const { data } = await api.get(`${ENDPOINTS.ALBUMS}/mine`);
    return data.albums;
  },

  async createSong(input: { title: string; audioUrl: string; duration?: number; albumId?: string }): Promise<Song> {
    const { data } = await api.post(ENDPOINTS.SONGS, input);
    return data.song;
  },

  async getMySongs(): Promise<Song[]> {
    const { data } = await api.get(`${ENDPOINTS.SONGS}/mine`);
    return data.songs;
  },

  async getPublicSongs(): Promise<Song[]> {
    const { data } = await api.get(ENDPOINTS.SONGS);
    return data.songs;
  },

  // features/content/services/content.service.ts — add this method to the object
  async requestVerification(): Promise<void> {
    await api.post(`${ENDPOINTS.CHOIRS}/me/request-verification`);
  },
};
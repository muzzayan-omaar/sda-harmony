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

  async createSong(input: {
    title: string;
    audioUrl: string;
    duration?: number;
    albumId?: string;
  }): Promise<Song> {
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

  async likeSong(songId: string): Promise<void> {
    await api.post(`${ENDPOINTS.SONGS}/${songId}/like`);
  },

  async unlikeSong(songId: string): Promise<void> {
    await api.delete(`${ENDPOINTS.SONGS}/${songId}/like`);
  },

  async getLikedSongs(): Promise<Song[]> {
    const { data } = await api.get(`${ENDPOINTS.SONGS}/liked`);
    return data.songs;
  },

  async getLikedSongIds(): Promise<string[]> {
    const { data } = await api.get(`${ENDPOINTS.SONGS}/liked/ids`);
    return data.songIds;
  },

  async getChoirById(id: string): Promise<ChoirProfile> {
    const { data } = await api.get(`${ENDPOINTS.CHOIRS}/${id}`);
    return data.choir;
  },

  async getChoirSongs(id: string): Promise<Song[]> {
    const { data } = await api.get(`${ENDPOINTS.CHOIRS}/${id}/songs`);
    return data.songs;
  },

  async requestVerification(): Promise<void> {
    await api.post(`${ENDPOINTS.CHOIRS}/me/request-verification`);
  },
};
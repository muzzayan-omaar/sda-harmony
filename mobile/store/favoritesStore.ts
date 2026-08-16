// store/favoritesStore.ts (new file)
import { create } from "zustand";
import { contentService } from "@/features/content/services/content.service";

interface FavoritesState {
  likedIds: Set<string>;
  loaded: boolean;

  load: () => Promise<void>;
  toggle: (songId: string) => Promise<void>;
  isLiked: (songId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  likedIds: new Set(),
  loaded: false,

  load: async () => {
    try {
      const ids = await contentService.getLikedSongIds();
      set({ likedIds: new Set(ids), loaded: true });
    } catch {
      // not logged in yet, or request failed
    }
  },

  toggle: async (songId) => {
    const { likedIds } = get();
    const wasLiked = likedIds.has(songId);

    const next = new Set(likedIds);
    wasLiked ? next.delete(songId) : next.add(songId);
    set({ likedIds: next });

    try {
      if (wasLiked) {
        await contentService.unlikeSong(songId);
      } else {
        await contentService.likeSong(songId);
      }
    } catch {
      set({ likedIds }); // revert on failure
    }
  },

  isLiked: (songId) => get().likedIds.has(songId),
}));
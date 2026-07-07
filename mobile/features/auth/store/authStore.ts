import { create } from "zustand";

import { AuthState } from "../types/auth";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  isAuthenticated: false,

  isLoading: false,

  login: (user) =>
    set({
      user,
      isAuthenticated: true,
    }),

  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),

  setLoading: (loading) =>
    set({
      isLoading: loading,
    }),
}));
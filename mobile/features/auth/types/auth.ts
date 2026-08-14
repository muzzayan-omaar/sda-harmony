// features/auth/types/auth.ts (replace entire file)
export type UserRole = "LISTENER" | "CHOIR" | "ADMIN";

export interface Choir {
  id: string;
  isVerified: boolean;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  isVerified: boolean;
  avatar: string | null;
  choir?: Choir | null;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;

  isAuthenticated: boolean;
  isLoading: boolean;
  // True once persisted state has been read from AsyncStorage on app start.
  // Screens should wait for this before deciding where to route.
  hasHydrated: boolean;

  setSession: (session: {
    user: User;
    accessToken: string;
    refreshToken: string;
  }) => void;

  updateTokens: (tokens: { accessToken: string; refreshToken: string }) => void;

  clearSession: () => void;

  setLoading: (loading: boolean) => void;

  setHasHydrated: (hydrated: boolean) => void;
}

export interface RegisterInput {
  fullName: string;
  email: string;
  password: string;
  role: "LISTENER" | "CHOIR";
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  user: User;
  accessToken: string;
  refreshToken: string;
}
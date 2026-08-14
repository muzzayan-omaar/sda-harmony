export type UserRole = "listener" | "choir";

export interface User {
  id: string;
  fullName: string;
  email: string;

  role: UserRole;

  isVerified: boolean;

  avatar?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;

  role: UserRole;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface AuthState {
  user: User | null;

  token: string | null;

  isAuthenticated: boolean;

  isLoading: boolean;

  login: (response: AuthResponse) => void;

  logout: () => void;

  setLoading: (loading: boolean) => void;
}
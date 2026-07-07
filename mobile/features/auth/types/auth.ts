export type UserRole = "listener" | "choir";

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  verified: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (user: User) => void;

  logout: () => void;

  setLoading: (loading: boolean) => void;
}
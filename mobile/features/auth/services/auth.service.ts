// features/auth/services/auth.service.ts (new file)
import api from "@/services/api/client";
import { ENDPOINTS } from "@/services/api/endpoints";

import { AuthResponse, RegisterInput, LoginInput, User } from "../types/auth";

export const authService = {
  async register(input: RegisterInput): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>(
      `${ENDPOINTS.AUTH}/register`,
      input
    );
    return data;
  },

  async login(input: LoginInput): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>(
      `${ENDPOINTS.AUTH}/login`,
      input
    );
    return data;
  },

  async logout(refreshToken: string | null): Promise<void> {
    if (!refreshToken) return;
    await api.post(`${ENDPOINTS.AUTH}/logout`, { refreshToken });
  },

  async getMe(): Promise<User> {
    const { data } = await api.get<{ success: boolean; user: User }>(
      `${ENDPOINTS.AUTH}/me`
    );
    return data.user;
  },
};
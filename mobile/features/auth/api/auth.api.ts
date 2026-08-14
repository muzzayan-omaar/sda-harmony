import api from "@/services/api/client";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  role: "listener" | "choir";
}

export const AuthAPI = {
  login(data: LoginPayload) {
    return api.post("/auth/login", data);
  },

  register(data: RegisterPayload) {
    return api.post("/auth/register", data);
  },

  me() {
    return api.get("/auth/me");
  },

  logout() {
    return api.post("/auth/logout");
  },
};
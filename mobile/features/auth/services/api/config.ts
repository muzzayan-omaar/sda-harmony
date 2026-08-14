// services/api/config.ts (replace entire file)
import { Platform } from "react-native";

// localhost does NOT reach your machine from an Android emulator (needs
// 10.0.2.2) or a physical device (needs your machine's LAN IP). Set
// EXPO_PUBLIC_API_URL in a .env file at the project root once you have a
// real backend URL (e.g. after deploying, or your LAN IP for local dev on
// a physical phone) — it overrides everything below.
function resolveBaseUrl(): string {
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }

  if (Platform.OS === "android") {
    return "http://10.0.2.2:5000/api";
  }

  return "http://localhost:5000/api";
}

export const API_CONFIG = {
  BASE_URL: resolveBaseUrl(),
  TIMEOUT: 10000,
};
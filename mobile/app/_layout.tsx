import "../global.css";

import { Stack } from "expo-router";

import QueryProvider from "@/services/providers/QueryProvider";

import AuthGuard from "@/components/auth/AuthGuard";

export default function RootLayout() {
  return (
    <QueryProvider>
      <AuthGuard>
        <Stack screenOptions={{ headerShown: false }} />
      </AuthGuard>
    </QueryProvider>
  );
}
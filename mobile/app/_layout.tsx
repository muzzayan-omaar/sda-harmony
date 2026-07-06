import "../global.css";

import { Stack } from "expo-router";
import QueryProvider from "@/services/providers/QueryProvider";

export default function RootLayout() {
  return (
    <QueryProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </QueryProvider>
  );
}
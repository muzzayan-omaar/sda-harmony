import { PropsWithChildren, useEffect } from "react";
import { router, useSegments } from "expo-router";

import { useAuthStore } from "@/features/auth/store/authStore";

export default function AuthGuard({
  children,
}: PropsWithChildren) {
  const { isAuthenticated } = useAuthStore();

  const segments = useSegments();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (!isAuthenticated && !inAuthGroup) {
      router.replace("/welcome");
    }

    if (isAuthenticated && inAuthGroup) {
      router.replace("/home");
    }
  }, [isAuthenticated, segments]);

  return children;
}
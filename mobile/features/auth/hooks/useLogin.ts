import { useState } from "react";

import { AuthService } from "../services/auth.service";

export function useLogin() {
  const [loading, setLoading] = useState(false);

  async function login(
    email: string,
    password: string
  ) {
    try {
      setLoading(true);

      const response = await AuthService.login(
        email,
        password
      );

      return response.data;
    } finally {
      setLoading(false);
    }
  }

  return {
    login,
    loading,
  };
}
// src/domains/auth/useLogin.ts

import { useState } from "react";
import { authApi } from "@/api/v1";
import { useAuth } from "@/core/auth";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const res = await authApi.login({ email, password });

      // Persist auth
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("tenantId", "demo-hospital");

      login({
        id: res.user.id,
        email: res.user.email,
        role: res.user.role as any
      });

      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return {
    submit,
    loading,
    error
  };
};

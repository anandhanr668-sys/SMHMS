// src/core/auth/auth.context.tsx

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { AuthState, AuthUser } from "./auth.types";

interface AuthContextValue extends AuthState {
  login: (user: AuthUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

export const AuthProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  // Try to initialize from backend /auth/me using stored token (more robust than decoding JWT)
  useEffect(() => {
    const restore = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        // Use http client which injects Authorization header from localStorage
        const { http } = await import("@/api/v1/http");
        const res = await http.get<any>('/auth/me');
        const payload = res?.data?.user ?? res?.data;
        if (payload && payload.id) {
          setUser({ id: payload.id, email: payload.email, role: payload.role });
        }
      } catch (err) {
        // token invalid or request failed - clear it
        localStorage.removeItem("accessToken");
        console.warn("Auth restore failed", err);
      }
    };

    restore();
  }, []);

  const login = (userData: AuthUser) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error(
      "useAuthContext must be used within AuthProvider"
    );
  }
  return ctx;
};

// src/core/auth/auth.hooks.ts

import { useAuthContext } from "./auth.context";

export const useAuth = () => {
  const { user, isAuthenticated, login, logout } =
    useAuthContext();

  return {
    user,
    role: user?.role,
    isAuthenticated,
    login,
    logout
  };
};

// src/core/auth/auth.types.ts

export type UserRole =
  | "ADMIN"
  | "DOCTOR"
  | "NURSE"
  | "FRONTDESK"
  | "PATIENT";

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
}

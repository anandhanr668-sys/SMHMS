// shared/types/auth.types.ts

import { UUID } from "./common.types";

export type UserRole =
  | "ADMIN"
  | "DOCTOR"
  | "NURSE"
  | "FRONTDESK"
  | "PATIENT";

export interface JwtPayload {
  userId: UUID;
  tenantId: UUID;
  role: UserRole;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  expiresIn: string;
}

// src/types/auth.types.ts

import { ID } from "./common.types";

export type UserRole =
  | "ADMIN"
  | "DOCTOR"
  | "NURSE"
  | "FRONTDESK"
  | "PATIENT";

export interface User {
  id: ID;
  email: string;
  role: UserRole;
}

export interface AuthTokens {
  accessToken: string;
}

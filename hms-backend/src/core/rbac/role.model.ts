// src/core/rbac/role.model.ts

export type Role =
  | "ADMIN"
  | "DOCTOR"
  | "NURSE"
  | "FRONTDESK"
  | "PATIENT";

/**
 * Central role list (single source of truth)
 */
export const ROLES: Role[] = [
  "ADMIN",
  "DOCTOR",
  "NURSE",
  "FRONTDESK",
  "PATIENT"
];

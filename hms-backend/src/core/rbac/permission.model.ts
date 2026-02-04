// src/core/rbac/permission.model.ts

import { Role } from "./role.model.js";

/**
 * Permission definition
 */
export interface Permission {
  action: string;
  resource: string;
}

/**
 * Helper to stringify permissions
 */
export const permissionKey = (p: Permission): string =>
  `${p.action}:${p.resource}`;

/**
 * Role → permissions mapping
 * This is the RBAC heart
 */
export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  ADMIN: [{ action: "*", resource: "*" }],

  DOCTOR: [
    { action: "read", resource: "patient" },
    { action: "create", resource: "visit" },
    { action: "generate", resource: "report" }
  ],

  NURSE: [
    { action: "read", resource: "patient" },
    { action: "update", resource: "vitals" }
  ],

  FRONTDESK: [
    { action: "create", resource: "patient" },
    { action: "schedule", resource: "visit" }
  ],

  PATIENT: [{ action: "read", resource: "self" }]
};

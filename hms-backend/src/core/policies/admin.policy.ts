// src/core/policies/admin.policy.ts

import { Role } from "../rbac/role.model.js";

/**
 * Admin-only operations
 */
export const isAdmin = (role: Role): boolean => {
  return role === "ADMIN";
};

/**
 * Can manage users, roles, system settings
 */
export const canManageSystem = (role: Role): boolean => {
  return role === "ADMIN";
};

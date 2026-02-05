// src/core/rbac/rbac.utils.ts

import { Permission, RolePermissions } from "./rbac.types";
import { UserRole } from "../auth/auth.types";

const ROLE_PERMISSIONS: RolePermissions = {
  ADMIN: [{ action: "*", resource: "*" }],

  DOCTOR: [
    { action: "read", resource: "patient" },
    { action: "create", resource: "report" }
  ],

  NURSE: [{ action: "read", resource: "patient" }],

  FRONTDESK: [
    { action: "create", resource: "patient" },
    { action: "create", resource: "visit" }
  ],

  PATIENT: [{ action: "read", resource: "self" }]
};

export const hasPermission = (
  role: UserRole | undefined,
  permission: Permission
): boolean => {
  if (!role) return false;

  const perms = ROLE_PERMISSIONS[role] || [];

  return perms.some((p) => {
    const actionMatch =
      p.action === "*" || p.action === permission.action;
    const resourceMatch =
      p.resource === "*" ||
      p.resource === permission.resource;

    return actionMatch && resourceMatch;
  });
};

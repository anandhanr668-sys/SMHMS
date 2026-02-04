// src/core/rbac/access.guard.ts

import { Role } from "./role.model.js";
import { Permission, ROLE_PERMISSIONS } from "./permission.model.js";

/**
 * Checks whether a role has a specific permission
 */
export const hasPermission = (
  role: Role,
  required: Permission
): boolean => {
  const permissions = ROLE_PERMISSIONS[role] || [];

  return permissions.some((p) => {
    const actionMatch = p.action === "*" || p.action === required.action;
    const resourceMatch =
      p.resource === "*" || p.resource === required.resource;

    return actionMatch && resourceMatch;
  });
};

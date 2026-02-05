// src/core/rbac/rbac.types.ts

import { UserRole } from "../auth/auth.types";

export interface Permission {
  action: string;
  resource: string;
}

export type RolePermissions = Record<UserRole, Permission[]>;

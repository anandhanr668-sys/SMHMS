// src/core/rbac/PermissionGate.tsx

import { ReactNode } from "react";
import { Permission } from "./rbac.types";
import { hasPermission } from "./rbac.utils";
import { useAuth } from "../auth/auth.hooks";

interface PermissionGateProps {
  permission: Permission;
  children: ReactNode;
  fallback?: ReactNode;
}

export const PermissionGate = ({
  permission,
  children,
  fallback = null
}: PermissionGateProps) => {
  const { role } = useAuth();

  if (!hasPermission(role, permission)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

import { Request, Response, NextFunction } from "express";

/**
 * RBAC primitives
 */
export type Action = "create" | "read" | "update" | "delete";
export type Resource = "patient" | "visit" | "report" | "billing";

export type Permission = {
  action: Action;
  resource: Resource;
};

export type Role =
  | "ADMIN"
  | "DOCTOR"
  | "NURSE"
  | "FRONTDESK"
  | "PATIENT";

/**
 * Extend Express Request to include userRole
 */
declare module "express-serve-static-core" {
  interface Request {
    userRole?: Role;
  }
}

/**
 * 🔐 Role → Permission Matrix
 * (SINGLE SOURCE OF TRUTH)
 */
const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  ADMIN: [
    { action: "create", resource: "patient" },
    { action: "read", resource: "patient" },
    { action: "update", resource: "patient" },
    { action: "delete", resource: "patient" },

    { action: "read", resource: "report" },
    { action: "read", resource: "billing" }
  ],

  DOCTOR: [
    { action: "create", resource: "patient" },
    { action: "read", resource: "patient" },
    { action: "update", resource: "patient" },

    { action: "read", resource: "report" }
  ],

  NURSE: [
    { action: "read", resource: "patient" }
  ],

  FRONTDESK: [
    { action: "create", resource: "patient" },
    { action: "read", resource: "patient" }
  ],

  PATIENT: []
};

/**
 * ✅ RBAC Middleware
 */
export const requirePermission =
  (permission: Permission) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const role = req.userRole;

    // ❌ Not authenticated
    if (!role) {
      res.status(401).json({
        success: false,
        error: { code: "UNAUTHENTICATED" }
      });
      return;
    }

    const permissions = ROLE_PERMISSIONS[role] ?? [];

    const allowed = permissions.some(
      (p) =>
        p.action === permission.action &&
        p.resource === permission.resource
    );

    // ❌ Authenticated but not authorized
    if (!allowed) {
      res.status(403).json({
        success: false,
        error: { code: "FORBIDDEN" }
      });
      return;
    }

    // ✅ Authorized
    next();
  };
// src/core/rbac/role.middleware.ts

import { Request, Response, NextFunction } from "express";
import { Permission } from "./permission.model.js";
import { hasPermission } from "./access.guard.js";
import { Role } from "./role.model.js";

/**
 * Temporary user context (until auth is implemented)
 */
declare module "express-serve-static-core" {
  interface Request {
    userRole?: Role;
  }
}

/**
 * RBAC middleware
 */
export const requirePermission =
  (permission: Permission) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const role = req.userRole;

    if (!role) {
      res.status(401).json({
        success: false,
        error: {
          code: "UNAUTHENTICATED",
          message: "User role not found"
        }
      });
      return;
    }

    if (!hasPermission(role, permission)) {
      res.status(403).json({
        success: false,
        error: {
          code: "FORBIDDEN",
          message: "Access denied"
        }
      });
      return;
    }

    next();
  };

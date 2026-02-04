// src/core/tenant/tenant.middleware.ts

import { Request, Response, NextFunction } from "express";
import { resolveTenant } from "./tenant.resolver.js";
import { tenantConfig } from "../../config/tenant.config.js";
import { TenantContext } from "./tenant.model.js";

/**
 * Augment Express Request with tenant context
 */
declare module "express-serve-static-core" {
  interface Request {
    tenantContext?: TenantContext;
  }
}

/**
 * Tenant enforcement middleware
 */
export const tenantMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const tenant = resolveTenant(req);

  if (!tenant) {
    res.status(400).json({
      success: false,
      error: {
        code: "TENANT_MISSING",
        message: `Missing tenant header: ${tenantConfig.headerKey}`
      }
    });
    return;
  }

  if (!tenant.isActive) {
    res.status(403).json({
      success: false,
      error: {
        code: "TENANT_INACTIVE",
        message: "Tenant is inactive"
      }
    });
    return;
  }

  req.tenantContext = { tenant };
  next();
};

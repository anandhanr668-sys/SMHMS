// src/core/tenant/tenant.resolver.ts

import { Request } from "express";
import { Tenant } from "./tenant.model.js";
import { tenantConfig } from "../../config/tenant.config.js";

/**
 * Resolves tenant from request headers.
 * This is intentionally synchronous and simple for now.
 */
export const resolveTenant = (req: Request): Tenant | null => {
  const tenantId = req.headers[tenantConfig.headerKey] as string | undefined;

  if (!tenantId) {
    return null;
  }

  /**
   * Temporary in-memory tenant resolution.
   * In production, this will be fetched from DB or cache.
   */
  const tenant: Tenant = {
    id: tenantId,
    name: "Default Hospital",
    isActive: true
  };

  return tenant;
};

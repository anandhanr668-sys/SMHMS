// src/config/tenant.config.ts

export const TENANT_HEADER_KEY = "x-tenant-id";

/**
 * Tenant resolution strategy
 */
export const tenantConfig = {
  headerKey: TENANT_HEADER_KEY,
  required: true
};

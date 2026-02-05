// src/core/tenant/tenant.hooks.ts

import { useTenantContext } from "./tenant.context";

export const useTenant = () => {
  const { tenant, setTenant, clearTenant } = useTenantContext();

  return {
    tenant,
    tenantId: tenant?.id,
    tenantName: tenant?.name,
    setTenant,
    clearTenant
  };
};

// src/core/tenant/tenant.types.ts

export interface Tenant {
  id: string;
  name: string;
}

export interface TenantState {
  tenant: Tenant | null;
}

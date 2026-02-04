// src/core/tenant/tenant.model.ts

//import { UUID } from "../../shared/types/common.types.ts";
import { UUID } from "@shared/types/common.types";

/**
 * Tenant (Hospital) representation
 * This is a pure domain model — no DB or framework code
 */
export interface Tenant {
  id: UUID;
  name: string;
  isActive: boolean;
}

/**
 * Request-scoped tenant context
 * Attached to every request after resolution
 */
export interface TenantContext {
  tenant: Tenant;
}

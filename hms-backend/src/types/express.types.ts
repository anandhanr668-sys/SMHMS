// src/types/express.types.ts

import { Role } from "../core/rbac/role.model.js";
import { Tenant } from "../core/tenant/tenant.model.js";

declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
    userRole?: Role;
    tenant?: Tenant;
    requestId?: string;
  }
}

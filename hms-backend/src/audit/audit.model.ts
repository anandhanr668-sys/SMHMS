// src/audit/audit.model.ts

import { UUID } from "@shared/types/common.types.js";

export type AuditAction =
  | "CREATE"
  | "UPDATE"
  | "DELETE"
  | "VIEW"
  | "LOGIN"
  | "LOGOUT";

export interface AuditLog {
  id: UUID;
  tenantId: UUID;
  userId: UUID;
  action: AuditAction;
  entity: string;
  entityId?: UUID;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

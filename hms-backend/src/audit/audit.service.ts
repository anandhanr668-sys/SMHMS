// src/audit/audit.service.ts

import { AuditLog } from "./audit.model.js";

export const auditService = {
  log: (entry: AuditLog): void => {
    // Placeholder: later send to DB / log store
    console.log("🧾 AUDIT LOG:", {
      ...entry,
      timestamp: new Date().toISOString()
    });
  }
};

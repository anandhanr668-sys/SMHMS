// src/api/v1/audit.api.ts

import { http } from "./http";

export interface AuditLog {
  id: string;
  action: string;
  entity: string;
  createdAt: string;
}

export const auditApi = {
  getAll: async (): Promise<AuditLog[]> => {
    const { data } = await http.get<AuditLog[]>("/audit");
    return data;
  }
};

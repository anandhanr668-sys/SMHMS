// src/domains/audit/useAudit.ts

import { useEffect, useState } from "react";

export interface AuditLog {
  id: string;
  user: string;
  action: string;
  entity: string;
  timestamp: string;
}

/**
 * Frontend-safe demo logs.
 * Replace with auditApi later.
 */
export const useAudit = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const demo: AuditLog[] = [
        {
          id: "log-1",
          user: "admin@demo-hms.com",
          action: "CREATE",
          entity: "PATIENT",
          timestamp: new Date().toISOString()
        },
        {
          id: "log-2",
          user: "doctor@demo-hms.com",
          action: "VIEW",
          entity: "REPORT",
          timestamp: new Date().toISOString()
        }
      ];

      setLogs(demo);
      setLoading(false);
    };

    load();
  }, []);

  return { logs, loading };
};

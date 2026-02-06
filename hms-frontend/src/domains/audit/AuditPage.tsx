// src/domains/audit/AuditPage.tsx

import { useAudit } from "./useAudit";

export const AuditPage = () => {
  const { logs, loading } = useAudit();

  if (loading) {
    return <div>Loading audit logs...</div>;
  }

  return (
    <div>
      <h2 style={{ marginBottom: "1rem" }}>Audit Logs</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: "#ffffff"
        }}
      >
        <thead>
          <tr>
            <th style={{ padding: "0.5rem", textAlign: "left" }}>
              User
            </th>
            <th style={{ padding: "0.5rem", textAlign: "left" }}>
              Action
            </th>
            <th style={{ padding: "0.5rem", textAlign: "left" }}>
              Entity
            </th>
            <th style={{ padding: "0.5rem", textAlign: "left" }}>
              Time
            </th>
          </tr>
        </thead>

        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td style={{ padding: "0.5rem" }}>
                {log.user}
              </td>
              <td style={{ padding: "0.5rem", fontWeight: 600 }}>
                {log.action}
              </td>
              <td style={{ padding: "0.5rem" }}>
                {log.entity}
              </td>
              <td style={{ padding: "0.5rem" }}>
                {new Date(log.timestamp).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

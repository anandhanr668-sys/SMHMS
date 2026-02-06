// src/domains/visits/VisitsPage.tsx

import { useVisits } from "./useVisits";

export const VisitsPage = () => {
  const { visits, loading } = useVisits();

  if (loading) {
    return <div>Loading visits...</div>;
  }

  return (
    <div>
      <h2 style={{ marginBottom: "1rem" }}>Visits</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0"
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
            <th style={{ padding: "0.75rem", textAlign: "left", fontWeight: 600 }}>
              Visit Date
            </th>
            <th style={{ padding: "0.75rem", textAlign: "left", fontWeight: 600 }}>
              Patient
            </th>
            <th style={{ padding: "0.75rem", textAlign: "left", fontWeight: 600 }}>
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {visits.length > 0 ? (
            visits.map((v) => (
              <tr key={v.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                <td style={{ padding: "0.75rem" }}>{v.visitDate}</td>
                <td style={{ padding: "0.75rem" }}>{v.patientId}</td>
                <td style={{ padding: "0.75rem" }}>
                  <span style={{
                    backgroundColor: v.status === "COMPLETED" ? "#d1fae5" : v.status === "ONGOING" ? "#fef3c7" : "#dbeafe",
                    color: v.status === "COMPLETED" ? "#065f46" : v.status === "ONGOING" ? "#92400e" : "#0c4a6e",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "4px",
                    fontSize: "0.85rem",
                    fontWeight: 500
                  }}>
                    {v.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} style={{ padding: "1rem", textAlign: "center", color: "#64748b" }}>
                No visits found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

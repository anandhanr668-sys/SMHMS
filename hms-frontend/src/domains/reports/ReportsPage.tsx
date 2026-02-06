// src/domains/reports/ReportsPage.tsx

import { useReports } from "./useReports";

export const ReportsPage = () => {
  const { reports, loading } = useReports();

  if (loading) {
    return <div>Loading reports...</div>;
  }

  return (
    <div>
      <h2 style={{ marginBottom: "1rem" }}>Reports</h2>

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
              Report ID
            </th>
            <th style={{ padding: "0.75rem", textAlign: "left", fontWeight: 600 }}>
              Visit ID
            </th>
            <th style={{ padding: "0.75rem", textAlign: "left", fontWeight: 600 }}>
              Template Version
            </th>
          </tr>
        </thead>
        <tbody>
          {reports.length > 0 ? (
            reports.map((report) => (
              <tr key={report.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                <td style={{ padding: "0.75rem" }}>{report.id}</td>
                <td style={{ padding: "0.75rem" }}>{report.visitId}</td>
                <td style={{ padding: "0.75rem" }}>{report.templateVersion}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} style={{ padding: "1rem", textAlign: "center", color: "#64748b" }}>
                No reports found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

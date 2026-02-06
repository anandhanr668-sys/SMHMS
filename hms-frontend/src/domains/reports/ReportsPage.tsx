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
          backgroundColor: "#ffffff"
        }}
      >
        <thead>
          <tr>
            <th style={{ padding: "0.5rem", textAlign: "left" }}>
              Report ID
            </th>
            <th style={{ padding: "0.5rem", textAlign: "left" }}>
              Template Version
            </th>
          </tr>
        </thead>

        <tbody>
          {reports.map((report) => (
            <tr key={report.id}>
              <td style={{ padding: "0.5rem" }}>
                {report.id}
              </td>
              <td style={{ padding: "0.5rem" }}>
                {report.templateVersion}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

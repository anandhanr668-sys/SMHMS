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
          backgroundColor: "#ffffff"
        }}
      >
        <thead>
          <tr>
            <th style={{ padding: "0.5rem", textAlign: "left" }}>
              Visit Date
            </th>
            <th style={{ padding: "0.5rem", textAlign: "left" }}>
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {visits.map((visit) => (
            <tr key={visit.id}>
              <td style={{ padding: "0.5rem" }}>
                {new Date(visit.visitDate).toLocaleString()}
              </td>
              <td style={{ padding: "0.5rem" }}>{visit.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

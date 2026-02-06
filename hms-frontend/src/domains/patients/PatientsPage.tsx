// src/domains/patients/PatientsPage.tsx

import { usePatients } from "./usePatients";

export const PatientsPage = () => {
  const { patients, loading } = usePatients();

  if (loading) {
    return <div>Loading patients...</div>;
  }

  return (
    <div>
      <h2 style={{ marginBottom: "1rem" }}>Patients</h2>

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
            <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>
              Name
            </th>
            <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>
              Gender
            </th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
              <td style={{ padding: "0.75rem" }}>
                {p.firstName} {p.lastName}
              </td>
              <td style={{ padding: "0.75rem" }}>{p.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

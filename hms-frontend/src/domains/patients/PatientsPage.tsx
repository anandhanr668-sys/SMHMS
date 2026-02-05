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
          backgroundColor: "#ffffff"
        }}
      >
        <thead>
          <tr>
            <th style={{ textAlign: "left", padding: "0.5rem" }}>
              Name
            </th>
            <th style={{ textAlign: "left", padding: "0.5rem" }}>
              Gender
            </th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p.id}>
              <td style={{ padding: "0.5rem" }}>
                {p.firstName} {p.lastName}
              </td>
              <td style={{ padding: "0.5rem" }}>{p.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

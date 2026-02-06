// src/domains/staff/StaffPage.tsx

import { useStaff } from "./useStaff";

export const StaffPage = () => {
  const { staff, loading } = useStaff();

  if (loading) {
    return <div>Loading staff...</div>;
  }

  return (
    <div>
      <h2 style={{ marginBottom: "1rem" }}>Staff</h2>

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
              Name
            </th>
            <th style={{ padding: "0.5rem", textAlign: "left" }}>
              Role
            </th>
            <th style={{ padding: "0.5rem", textAlign: "left" }}>
              Department
            </th>
          </tr>
        </thead>

        <tbody>
          {staff.map((member) => (
            <tr key={member.id}>
              <td style={{ padding: "0.5rem" }}>
                {member.name}
              </td>
              <td style={{ padding: "0.5rem" }}>
                {member.role}
              </td>
              <td style={{ padding: "0.5rem" }}>
                {member.department}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// src/domains/wards-beds/WardsBedsPage.tsx

import { useWardsBeds } from "./useWardsBeds";

const statusColor = (status: string) => {
  switch (status) {
    case "AVAILABLE":
      return "#16a34a";
    case "OCCUPIED":
      return "#dc2626";
    case "MAINTENANCE":
      return "#ca8a04";
    default:
      return "#6b7280";
  }
};

export const WardsBedsPage = () => {
  const { wards, loading } = useWardsBeds();

  if (loading) {
    return <div>Loading wards & beds...</div>;
  }

  return (
    <div>
      <h2 style={{ marginBottom: "1rem" }}>Wards & Beds</h2>

      {wards.map((ward) => (
        <div
          key={ward.id}
          style={{
            marginBottom: "1.5rem",
            padding: "1rem",
            backgroundColor: "#ffffff",
            borderRadius: "6px"
          }}
        >
          <h3 style={{ marginBottom: "0.75rem" }}>{ward.name}</h3>

          <div style={{ display: "flex", gap: "0.75rem" }}>
            {ward.beds.map((bed) => (
              <div
                key={bed.id}
                style={{
                  padding: "0.5rem 0.75rem",
                  borderRadius: "4px",
                  backgroundColor: "#f1f5f9",
                  border: `2px solid ${statusColor(bed.status)}`,
                  fontWeight: 500
                }}
              >
                {bed.label}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

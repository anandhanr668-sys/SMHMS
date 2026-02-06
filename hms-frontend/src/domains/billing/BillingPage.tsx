// src/domains/billing/BillingPage.tsx

import { useBilling } from "./useBilling";

const statusColor = (status: string) => {
  switch (status) {
    case "PAID":
      return "#16a34a";
    case "PENDING":
      return "#ca8a04";
    case "CANCELLED":
      return "#dc2626";
    default:
      return "#6b7280";
  }
};

export const BillingPage = () => {
  const { invoices, loading } = useBilling();

  if (loading) {
    return <div>Loading billing records...</div>;
  }

  return (
    <div>
      <h2 style={{ marginBottom: "1rem" }}>Billing</h2>

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
              Invoice ID
            </th>
            <th style={{ padding: "0.5rem", textAlign: "left" }}>
              Patient
            </th>
            <th style={{ padding: "0.5rem", textAlign: "left" }}>
              Amount
            </th>
            <th style={{ padding: "0.5rem", textAlign: "left" }}>
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {invoices.map((inv) => (
            <tr key={inv.id}>
              <td style={{ padding: "0.5rem" }}>{inv.id}</td>
              <td style={{ padding: "0.5rem" }}>
                {inv.patientName}
              </td>
              <td style={{ padding: "0.5rem" }}>
                ₹{inv.amount.toLocaleString()}
              </td>
              <td
                style={{
                  padding: "0.5rem",
                  fontWeight: 600,
                  color: statusColor(inv.status)
                }}
              >
                {inv.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

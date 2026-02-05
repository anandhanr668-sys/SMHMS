// src/core/layout/Sidebar.tsx

export const Sidebar = () => {
  return (
    <aside
      style={{
        width: "220px",
        backgroundColor: "#020617",
        color: "#e5e7eb",
        padding: "1rem"
      }}
    >
      <nav>
        <div style={{ marginBottom: "0.75rem" }}>Dashboard</div>
        <div style={{ marginBottom: "0.75rem" }}>Patients</div>
        <div style={{ marginBottom: "0.75rem" }}>Visits</div>
        <div style={{ marginBottom: "0.75rem" }}>Reports</div>
        <div>Billing</div>
      </nav>
    </aside>
  );
};

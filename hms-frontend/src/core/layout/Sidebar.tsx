import { Link, useLocation } from "react-router-dom";

export const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { label: "📊 Dashboard", path: "/" },
    { label: "👥 Patients", path: "/patients" },
    { label: "🏥 Visits", path: "/visits" },
    { label: "📄 Reports", path: "/reports" },
    { label: "🛏️ Wards & Beds", path: "/wards-beds" },
    { label: "👨‍⚕️ Staff", path: "/staff" },
    { label: "💳 Billing", path: "/billing" },
    { label: "📋 Audit", path: "/audit" },
    { label: "📈 Analytics", path: "/analytics" }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          style={{
            display: "block",
            padding: "0.75rem 1rem",
            borderRadius: "6px",
            color: location.pathname === item.path ? "#ffffff" : "#cbd5e1",
            backgroundColor: location.pathname === item.path ? "#2563eb" : "transparent",
            transition: "all 0.2s ease",
            fontSize: "0.95rem",
            fontWeight: location.pathname === item.path ? 600 : 500,
            textDecoration: "none",
            border: "none",
            cursor: "pointer"
          }}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
};

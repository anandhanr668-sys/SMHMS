import { useTenant } from "../tenant/tenant.hooks";
import { useAuth } from "../auth";
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  const { tenantName } = useTenant();
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    // clear auth token + context
    localStorage.removeItem("accessToken");
    logout();
    navigate("/login");
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "0.5rem",
        fontSize: "1.1rem",
        fontWeight: 600,
        width: "100%"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        🏥 {tenantName ?? "Hospital Management System"}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        {isAuthenticated ? (
          <>
            <div style={{ color: "#e6eef8", fontSize: "0.95rem" }}>{user?.email}</div>
            <button
              onClick={handleLogout}
              style={{
                background: "#ef4444",
                color: "white",
                border: "none",
                padding: "6px 10px",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: 600
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            style={{
              background: "#2563eb",
              color: "white",
              padding: "6px 10px",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: 600
            }}
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

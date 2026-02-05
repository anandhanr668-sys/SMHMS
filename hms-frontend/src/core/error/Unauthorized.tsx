// src/core/error/Unauthorized.tsx

import { Link } from "react-router-dom";

export const Unauthorized = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f8fafc",
        color: "#7c2d12",
        textAlign: "center"
      }}
    >
      <h1 style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>
        Access Denied
      </h1>
      <p style={{ marginBottom: "1rem" }}>
        You do not have permission to view this page.
      </p>
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "#2563eb",
          fontWeight: 500
        }}
      >
        Return to dashboard
      </Link>
    </div>
  );
};

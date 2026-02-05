// src/core/error/NotFound.tsx

import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f8fafc",
        color: "#0f172a",
        textAlign: "center"
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
        404 — Page Not Found
      </h1>
      <p style={{ marginBottom: "1rem", opacity: 0.8 }}>
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "#2563eb",
          fontWeight: 500
        }}
      >
        Go back to dashboard
      </Link>
    </div>
  );
};

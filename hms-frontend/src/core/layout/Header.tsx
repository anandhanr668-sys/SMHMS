// src/core/layout/Header.tsx

import { useTenant } from "../tenant/tenant.hooks";

export const Header = () => {
  const { tenantName } = useTenant();

  return (
    <header
      style={{
        height: "56px",
        backgroundColor: "#0f172a",
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        padding: "0 1rem",
        fontWeight: 600
      }}
    >
      🏥 {tenantName ?? "Hospital Management System"}
    </header>
  );
};

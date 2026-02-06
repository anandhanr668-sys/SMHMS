// src/shared/components/Card.tsx

import { ReactNode } from "react";

export const Card = ({ children }: { children: ReactNode }) => {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        padding: "1rem",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
      }}
    >
      {children}
    </div>
  );
};

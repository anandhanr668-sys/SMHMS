// src/shared/components/Table.tsx

import { ReactNode } from "react";

export const Table = ({ children }: { children: ReactNode }) => {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        backgroundColor: "#ffffff"
      }}
    >
      {children}
    </table>
  );
};

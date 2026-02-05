// src/core/layout/AppLayout.tsx

import { ReactNode } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />

      <div style={{ flex: 1, display: "flex" }}>
        <Sidebar />

        <main
          style={{
            flex: 1,
            padding: "1.5rem",
            backgroundColor: "#f8fafc"
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

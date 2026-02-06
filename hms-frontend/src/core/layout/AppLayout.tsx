import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export const AppLayout = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100%",
        backgroundColor: "#f8fafc"
      }}
    >
      {/* ===== Header ===== */}
      <header
        style={{
          height: "56px",
          backgroundColor: "#0f172a",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          padding: "0 1.5rem",
          fontWeight: 600,
          flexShrink: 0,
          zIndex: 100
        }}
      >
        <Header />
      </header>

      {/* ===== Body ===== */}
      <div
        style={{
          display: "flex",
          flex: 1,
          overflow: "hidden",
          width: "100%"
        }}
      >
        {/* Sidebar */}
        <aside
          style={{
            width: "220px",
            backgroundColor: "#020617",
            color: "#cbd5e1",
            padding: "1rem",
            flexShrink: 0,
            overflowY: "auto",
            borderRight: "1px solid #1e293b"
          }}
        >
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main
          style={{
            flex: 1,
            padding: "1.5rem",
            backgroundColor: "#f8fafc",
            overflowY: "auto",
            width: "100%"
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

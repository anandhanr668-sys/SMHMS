import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./app/App";
import { ErrorBoundary } from "./core/error/ErrorBoundary";
import "./index.css";

const root = document.getElementById("root");

if (!root) throw new Error("Root element not found");

// Developer convenience: auto-set tenant in development so LCNC pages can call APIs
if (import.meta.env.MODE === "development") {
  if (!localStorage.getItem("tenantId")) {
    localStorage.setItem("tenantId", "local");
    console.info("[dev] tenantId set to 'local' for development");
  }
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);

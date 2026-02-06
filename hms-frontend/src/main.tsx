// hms-frontend/src/main.tsx

import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./app/App";
import { ErrorBoundary } from "./core/error";

import "@/styles/global.css";
import "@/styles/dashboard.css";

import "@/index.css";


const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element #root not found");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

// hms-frontend/src/app/App.tsx

import { Routes, Route, Navigate } from "react-router-dom";

import { AppProviders } from "./AppProviders";
import { AppLayout } from "../core/layout";
import { NotFound } from "../core/error";

/* -------------------- Pages -------------------- */
const HomePage = () => {
  return <div>Welcome to HMS Dashboard</div>;
};

/* -------------------- App -------------------- */
export const App = () => {
  return (
    <AppProviders>
      <Routes>
        {/* Root Dashboard */}
        <Route
          path="/"
          element={
            <AppLayout>
              <HomePage />
            </AppLayout>
          }
        />

        {/* Auth routes (placeholder) */}
        <Route path="/login" element={<Navigate to="/" replace />} />

        {/* 404 - Catch all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppProviders>
  );
};

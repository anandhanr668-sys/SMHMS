// hms-frontend/src/app/App.tsx

import { Routes, Route } from "react-router-dom";

import { AppProviders } from "./AppProviders";
import { AppLayout } from "../core/layout";
import { NotFound } from "../core/error";

import { LoginPage } from "@/domains/auth";
import { PatientsPage } from "@/domains/patients";

/* -------------------- Pages -------------------- */
const HomePage = () => {
  return <div>Welcome to HMS Dashboard</div>;
};

/* -------------------- App -------------------- */
export const App = () => {
  return (
    <AppProviders>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Dashboard routes */}
        <Route
          path="/"
          element={
            <AppLayout>
              <HomePage />
            </AppLayout>
          }
        />

        <Route
          path="/patients"
          element={
            <AppLayout>
              <PatientsPage />
            </AppLayout>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppProviders>
  );
};

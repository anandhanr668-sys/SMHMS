import { Routes, Route } from "react-router-dom";

import { AppProviders } from "./AppProviders";
import { AppLayout } from "@/core/layout";
import { NotFound } from "@/core/error";

/* -------------------- Auth -------------------- */
import { LoginPage } from "@/domains/auth";

/* -------------------- Dashboard Pages -------------------- */
import { PatientsPage } from "@/domains/patients";
import { VisitsPage } from "@/domains/visits";
import { ReportsPage } from "@/domains/reports";
import { WardsBedsPage } from "@/domains/wards-beds";
import { StaffPage } from "@/domains/staff";
import { BillingPage } from "@/domains/billing";
import { AuditPage } from "@/domains/audit";
import { AnalyticsPage } from "@/domains/analytics";

/* -------------------- Home -------------------- */
const HomePage = () => {
  return <div>Welcome to HMS Dashboard</div>;
};

/* -------------------- App -------------------- */
export const App = () => {
  return (
    <AppProviders>
      <Routes>
        {/* ---------- Public Routes ---------- */}
        <Route path="/login" element={<LoginPage />} />

        {/* ---------- Protected / Dashboard Routes ---------- */}
        <Route element={<AppLayout children={undefined} />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/visits" element={<VisitsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/wards-beds" element={<WardsBedsPage />} />
          <Route path="/staff" element={<StaffPage />} />
          <Route path="/billing" element={<BillingPage />} />
          <Route path="/audit" element={<AuditPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
        </Route>

        {/* ---------- 404 ---------- */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppProviders>
  );
};
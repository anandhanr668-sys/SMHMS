// src/routes/AppRoutes.tsx

import { Routes, Route, Navigate } from "react-router-dom";

import { useAuth } from "@/core/auth";
import { AppLayout } from "@/core/layout";
import { NotFound, Unauthorized } from "@/core/error";

// Auth
import { LoginPage } from "@/domains/auth";

// Core Domains
import { PatientsPage } from "@/domains/patients";
import { VisitsPage } from "@/domains/visits";
import { ReportsPage } from "@/domains/reports";
import { WardsBedsPage } from "@/domains/wards-beds";
import { StaffPage } from "@/domains/staff";
import { BillingPage } from "@/domains/billing";
import { AuditPage } from "@/domains/audit";
import { AnalyticsPage } from "@/domains/analytics";

// LCNC
import { FormBuilderPreview } from "@/lcnc/form-engine";
import { RulesPreview } from "@/lcnc/rules-engine";
import { ReportPreview } from "@/lcnc/report-engine";
import { WorkflowPreview } from "@/lcnc/workflow-engine";

/* -------------------------------------------------------
   🔐 PROTECTED LAYOUT WRAPPER
------------------------------------------------------- */
const ProtectedLayout = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <AppLayout />;
};

/* -------------------------------------------------------
   🏠 DASHBOARD DEFAULT
------------------------------------------------------- */
const DashboardHome = () => {
  return <div>Welcome to Hospital Management System</div>;
};

/* -------------------------------------------------------
   🚦 APP ROUTES
------------------------------------------------------- */
export const AppRoutes = () => {
  return (
    <Routes>
      {/* ---------- PUBLIC ---------- */}
      <Route path="/login" element={<LoginPage />} />

      {/* ---------- PROTECTED (USING LAYOUT) ---------- */}
      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/patients" element={<PatientsPage />} />
        <Route path="/visits" element={<VisitsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/wards-beds" element={<WardsBedsPage />} />
        <Route path="/staff" element={<StaffPage />} />
        <Route path="/billing" element={<BillingPage />} />
        <Route path="/audit" element={<AuditPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />

        {/* ---------- LCNC PREVIEWS ---------- */}
        <Route path="/lcnc/forms" element={<FormBuilderPreview />} />
        <Route path="/lcnc/rules" element={<RulesPreview />} />
        <Route path="/lcnc/reports" element={<ReportPreview />} />
        <Route path="/lcnc/workflows" element={<WorkflowPreview />} />
      </Route>

      {/* ---------- ERRORS ---------- */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

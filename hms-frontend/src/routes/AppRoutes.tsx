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
   🔐 PROTECTED ROUTE WRAPPER
------------------------------------------------------- */
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
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

      {/* ---------- PROTECTED ---------- */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout>
              <DashboardHome />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/patients"
        element={
          <ProtectedRoute>
            <AppLayout>
              <PatientsPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/visits"
        element={
          <ProtectedRoute>
            <AppLayout>
              <VisitsPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <AppLayout>
              <ReportsPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/wards-beds"
        element={
          <ProtectedRoute>
            <AppLayout>
              <WardsBedsPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/staff"
        element={
          <ProtectedRoute>
            <AppLayout>
              <StaffPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/billing"
        element={
          <ProtectedRoute>
            <AppLayout>
              <BillingPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/audit"
        element={
          <ProtectedRoute>
            <AppLayout>
              <AuditPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <AppLayout>
              <AnalyticsPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* ---------- LCNC PREVIEWS ---------- */}
      <Route
        path="/lcnc/forms"
        element={
          <ProtectedRoute>
            <AppLayout>
              <FormBuilderPreview />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/lcnc/rules"
        element={
          <ProtectedRoute>
            <AppLayout>
              <RulesPreview />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/lcnc/reports"
        element={
          <ProtectedRoute>
            <AppLayout>
              <ReportPreview />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/lcnc/workflows"
        element={
          <ProtectedRoute>
            <AppLayout>
              <WorkflowPreview />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* ---------- ERRORS ---------- */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

// hms-frontend/src/app/AppProviders.tsx

import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "../core/auth";
import { TenantProvider } from "../core/tenant";

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TenantProvider>{children}</TenantProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

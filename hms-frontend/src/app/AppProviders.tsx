// hms-frontend/src/app/AppProviders.tsx

import { ReactNode } from "react";

import { AuthProvider } from "../core/auth";
import { TenantProvider } from "../core/tenant";

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <AuthProvider>
      <TenantProvider>{children}</TenantProvider>
    </AuthProvider>
  );
};

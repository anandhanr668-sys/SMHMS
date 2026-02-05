// src/core/tenant/tenant.context.tsx

import { createContext, useContext, useState, ReactNode } from "react";
import { Tenant } from "./tenant.types";

interface TenantContextValue {
  tenant: Tenant | null;
  setTenant: (tenant: Tenant) => void;
  clearTenant: () => void;
}

const TenantContext = createContext<TenantContextValue | undefined>(
  undefined
);

export const TenantProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const [tenant, setTenantState] = useState<Tenant | null>({
    id: "demo-hospital",
    name: "Demo General Hospital"
  });

  const setTenant = (tenant: Tenant) => {
    setTenantState(tenant);
  };

  const clearTenant = () => {
    setTenantState(null);
  };

  return (
    <TenantContext.Provider
      value={{ tenant, setTenant, clearTenant }}
    >
      {children}
    </TenantContext.Provider>
  );
};

export const useTenantContext = () => {
  const ctx = useContext(TenantContext);
  if (!ctx) {
    throw new Error(
      "useTenantContext must be used within TenantProvider"
    );
  }
  return ctx;
};

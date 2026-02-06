// src/domains/billing/useBilling.ts

import { useEffect, useState } from "react";

export type InvoiceStatus = "PAID" | "PENDING" | "CANCELLED";

export interface Invoice {
  id: string;
  patientName: string;
  amount: number;
  status: InvoiceStatus;
  createdAt: string;
}

/**
 * Frontend-safe demo data.
 * Can be replaced with billingApi later without UI changes.
 */
export const useBilling = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const demo: Invoice[] = [
        {
          id: "inv-001",
          patientName: "Ravi Kumar",
          amount: 2500,
          status: "PAID",
          createdAt: new Date().toISOString()
        },
        {
          id: "inv-002",
          patientName: "Anita Sharma",
          amount: 4800,
          status: "PENDING",
          createdAt: new Date().toISOString()
        }
      ];

      setInvoices(demo);
      setLoading(false);
    };

    load();
  }, []);

  return { invoices, loading };
};

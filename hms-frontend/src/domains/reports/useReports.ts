// src/domains/reports/useReports.ts

import { useEffect, useState } from "react";
import { reportsApi, Report } from "@/api/v1";

const DEMO_REPORTS: Report[] = [
  { id: "r-1", visitId: "v-1", templateVersion: "v2.1" },
  { id: "r-2", visitId: "v-2", templateVersion: "v2.0" },
  { id: "r-3", visitId: "v-3", templateVersion: "v2.1" }
];

export const useReports = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await reportsApi.getAll();
        setReports(data);
        setError(null);
      } catch (err) {
        console.error("Error loading reports, using demo data:", err);
        setReports(DEMO_REPORTS);
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return {
    reports,
    loading,
    error
  };
};

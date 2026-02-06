// src/domains/reports/useReports.ts

import { useEffect, useState } from "react";
import { reportsApi, Report } from "@/api/v1";

export const useReports = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await reportsApi.getAll();
        setReports(data);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return {
    reports,
    loading
  };
};

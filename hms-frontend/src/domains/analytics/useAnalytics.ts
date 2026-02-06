// src/domains/analytics/useAnalytics.ts

import { useEffect, useState } from "react";

export interface Metric {
  name: string;
  value: number;
}

/**
 * Frontend-safe analytics hook.
 * Replace demo data with analyticsApi.getMetrics() later.
 */
export const useAnalytics = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      // Demo metrics (safe defaults)
      const demo: Metric[] = [
        { name: "Total Patients", value: 1240 },
        { name: "Active Visits", value: 87 },
        { name: "Reports Generated Today", value: 56 },
        { name: "Beds Available", value: 34 }
      ];

      setMetrics(demo);
      setLoading(false);
    };

    load();
  }, []);

  return { metrics, loading };
};

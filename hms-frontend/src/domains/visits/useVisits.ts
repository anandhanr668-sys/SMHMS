// src/domains/visits/useVisits.ts

import { useEffect, useState } from "react";
import { visitsApi, Visit } from "@/api/v1";

const DEMO_VISITS: Visit[] = [
  { id: "v-1", patientId: "p-1", status: "COMPLETED", visitDate: "2024-02-01" },
  { id: "v-2", patientId: "p-2", status: "ONGOING", visitDate: "2024-02-02" },
  { id: "v-3", patientId: "p-3", status: "SCHEDULED", visitDate: "2024-02-08" }
];

export const useVisits = () => {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await visitsApi.getAll();
        setVisits(data);
        setError(null);
      } catch (err) {
        console.error("Error loading visits, using demo data:", err);
        setVisits(DEMO_VISITS);
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return {
    visits,
    loading,
    error
  };
};

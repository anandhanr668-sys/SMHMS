// src/domains/visits/useVisits.ts

import { useEffect, useState } from "react";
import { visitsApi, Visit } from "@/api/v1";

export const useVisits = () => {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await visitsApi.getAll();
        setVisits(data);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return {
    visits,
    loading
  };
};

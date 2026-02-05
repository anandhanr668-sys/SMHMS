// src/domains/patients/usePatients.ts

import { useEffect, useState } from "react";
import { patientsApi, Patient } from "@/api/v1";

export const usePatients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await patientsApi.getAll();
      setPatients(data);
      setLoading(false);
    };

    load();
  }, []);

  return {
    patients,
    loading
  };
};

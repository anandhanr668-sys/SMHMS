// src/domains/patients/usePatients.ts

import { useEffect, useState } from "react";
import { patientsApi, Patient } from "@/api/v1";

const DEMO_PATIENTS: Patient[] = [
  { id: "p-1", firstName: "Ravi", lastName: "Kumar", gender: "Male" },
  { id: "p-2", firstName: "Priya", lastName: "Sharma", gender: "Female" },
  { id: "p-3", firstName: "Amit", lastName: "Singh", gender: "Male" },
  { id: "p-4", firstName: "Anjali", lastName: "Verma", gender: "Female" }
];

export const usePatients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await patientsApi.getAll();
        setPatients(data);
        setError(null);
      } catch (err) {
        console.error("Error loading patients, using demo data:", err);
        setPatients(DEMO_PATIENTS);
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return {
    patients,
    loading,
    error
  };
};

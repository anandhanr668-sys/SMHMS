// src/domains/staff/useStaff.ts

import { useEffect, useState } from "react";

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  department: string;
}

/**
 * Frontend-safe seed data.
 * Replace with usersApi later.
 */
export const useStaff = () => {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const demo: StaffMember[] = [
        {
          id: "staff-1",
          name: "Dr. Anil Kumar",
          role: "DOCTOR",
          department: "Cardiology"
        },
        {
          id: "staff-2",
          name: "Nurse Priya",
          role: "NURSE",
          department: "ICU"
        }
      ];

      setStaff(demo);
      setLoading(false);
    };

    load();
  }, []);

  return { staff, loading };
};

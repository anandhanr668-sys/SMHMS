// src/domains/wards-beds/useWardsBeds.ts

import { useEffect, useState } from "react";

export type BedStatus = "AVAILABLE" | "OCCUPIED" | "MAINTENANCE";

export interface Bed {
  id: string;
  label: string;
  status: BedStatus;
}

export interface Ward {
  id: string;
  name: string;
  beds: Bed[];
}

/**
 * NOTE:
 * This is frontend-safe mock data for now.
 * Replace with API + realtime later without changing UI.
 */
export const useWardsBeds = () => {
  const [wards, setWards] = useState<Ward[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const demo: Ward[] = [
        {
          id: "ward-1",
          name: "General Ward",
          beds: [
            { id: "bed-1", label: "G-01", status: "AVAILABLE" },
            { id: "bed-2", label: "G-02", status: "OCCUPIED" }
          ]
        },
        {
          id: "ward-2",
          name: "ICU",
          beds: [
            { id: "bed-3", label: "ICU-01", status: "MAINTENANCE" }
          ]
        }
      ];

      setWards(demo);
      setLoading(false);
    };

    load();
  }, []);

  return { wards, loading };
};

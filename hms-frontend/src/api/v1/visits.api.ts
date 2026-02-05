// src/api/v1/visits.api.ts

import { http } from "./http";

export interface Visit {
  id: string;
  patientId: string;
  status: string;
  visitDate: string;
}

export const visitsApi = {
  getAll: async (): Promise<Visit[]> => {
    const { data } = await http.get<Visit[]>("/visits");
    return data;
  }
};

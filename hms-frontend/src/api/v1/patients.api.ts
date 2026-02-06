// src/api/v1/patients.api.ts

import { http } from "./http";

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
}

export const patientsApi = {
  getAll: async (): Promise<Patient[]> => {
    const { data } = await http.get<any>("/patients");
    // Support both direct array and { success: true, data: [...] } shapes
    if (data && data.data) return data.data;
    return data;
  },

  create: async (
    payload: Omit<Patient, "id">
  ): Promise<Patient> => {
    const { data } = await http.post<Patient>(
      "/patients",
      payload
    );
    return data;
  }
};

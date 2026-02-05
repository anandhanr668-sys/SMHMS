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
    const { data } = await http.get<Patient[]>("/patients");
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

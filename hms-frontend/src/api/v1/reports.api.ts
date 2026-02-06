// src/api/v1/reports.api.ts

import { http } from "./http";

export interface Report {
  id: string;
  visitId: string;
  templateVersion: string;
}

export const reportsApi = {
  getAll: async (): Promise<Report[]> => {
    const { data } = await http.get<any>("/reports");
    if (data && data.data) return data.data;
    return data;
  }
};

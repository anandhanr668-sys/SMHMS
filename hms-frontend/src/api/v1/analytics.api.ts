// src/api/v1/analytics.api.ts

import { http } from "./http";

export interface Metric {
  name: string;
  value: number;
}

export const analyticsApi = {
  getMetrics: async (): Promise<Metric[]> => {
    const { data } = await http.get<Metric[]>("/analytics");
    return data;
  }
};

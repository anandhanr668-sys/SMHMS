// src/api/v1/health.api.ts

import { http } from "./http";

export const healthApi = {
  check: async (): Promise<{ status: string }> => {
    const { data } = await http.get("/health");
    return data;
  }
};

// src/api/v1/auth.api.ts

import { http } from "./http";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

export const authApi = {
  login: async (payload: LoginRequest): Promise<LoginResponse> => {
    const { data } = await http.post<LoginResponse>(
      "/auth/login",
      payload
    );
    return data;
  },

  logout: async (): Promise<void> => {
    await http.post("/auth/logout");
  }
};

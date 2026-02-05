// src/api/v1/users.api.ts

import { http } from "./http";

export interface User {
  id: string;
  email: string;
  role: string;
}

export const usersApi = {
  getAll: async (): Promise<User[]> => {
    const { data } = await http.get<User[]>("/users");
    return data;
  }
};

// src/api/v1/forms.api.ts

import { http } from "./http";

export interface FormSchema {
  id: string;
  name: string;
  fields: unknown[];
}

export const formsApi = {
  getAll: async (): Promise<FormSchema[]> => {
    const { data } = await http.get<FormSchema[]>("/forms");
    return data;
  }
};

// src/lcnc/form-engine/form.model.ts

import { UUID } from "@shared/types/common.types.js";

export type FormFieldType =
  | "text"
  | "number"
  | "date"
  | "select"
  | "checkbox"
  | "textarea";

export interface FormFieldOption {
  label: string;
  value: string;
}

export interface FormField {
  id: string;
  label: string;
  type: FormFieldType;
  required: boolean;
  options?: FormFieldOption[];
}

export interface FormDefinition {
  id: UUID;
  tenantId: UUID;
  name: string;
  version: string;
  fields: FormField[];
  isActive: boolean;
  createdAt: string;
}

// src/lcnc/form-engine/form.types.ts

export type FormFieldType =
  | "text"
  | "number"
  | "date"
  | "select"
  | "textarea";

export interface FormField {
  id: string;
  label: string;
  type: FormFieldType;
  required?: boolean;
  options?: string[]; // for select
}

export interface FormSchema {
  id: string;
  name: string;
  fields: FormField[];
}

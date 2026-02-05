// src/lcnc/form-engine/form.validator.ts

import { FormDefinition } from "./form.model.js";

export const validateFormSubmission = (
  form: FormDefinition,
  data: Record<string, unknown>
): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  for (const field of form.fields) {
    if (field.required && !(field.id in data)) {
      errors.push(`Missing required field: ${field.label}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
};

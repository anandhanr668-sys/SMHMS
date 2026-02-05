// src/lcnc/form-engine/form.service.ts

import { FormDefinition } from "./form.model.js";
import { generateJsonSchema } from "./form.schema.js";
import { validateFormSubmission } from "./form.validator.js";

export const formEngineService = {
  getFormSchema: (form: FormDefinition) => {
    return generateJsonSchema(form);
  },

  validateSubmission: (
    form: FormDefinition,
    data: Record<string, unknown>
  ) => {
    return validateFormSubmission(form, data);
  }
};

// src/lcnc/form-engine/form.schema.ts

import { FormDefinition } from "./form.model.js";

export const generateJsonSchema = (form: FormDefinition) => {
  const properties: Record<string, unknown> = {};
  const required: string[] = [];

  for (const field of form.fields) {
    properties[field.id] = {
      type:
        field.type === "number"
          ? "number"
          : field.type === "checkbox"
          ? "boolean"
          : "string",
      title: field.label
    };

    if (field.required) {
      required.push(field.id);
    }
  }

  return {
    type: "object",
    properties,
    required
  };
};

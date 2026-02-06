// src/lcnc/form-engine/useFormEngine.ts

import { useState } from "react";
import { FormSchema } from "./form.types";

export const useFormEngine = (schema: FormSchema) => {
  const initialValues = schema.fields.reduce<Record<string, any>>(
    (acc, field) => {
      acc[field.id] = "";
      return acc;
    },
    {}
  );

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const setValue = (fieldId: string, value: any) => {
    setValues((prev) => ({ ...prev, [fieldId]: value }));
  };

  const validate = (): boolean => {
    const nextErrors: Record<string, string> = {};

    for (const field of schema.fields) {
      if (field.required && !values[field.id]) {
        nextErrors[field.id] = "This field is required";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submit = () => {
    if (!validate()) return null;
    return values;
  };

  return {
    values,
    errors,
    setValue,
    submit
  };
};

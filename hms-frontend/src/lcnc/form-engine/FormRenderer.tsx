// src/lcnc/form-engine/FormRenderer.tsx

import { FormSchema } from "./form.types";
import { useFormEngine } from "./useFormEngine";

interface FormRendererProps {
  schema: FormSchema;
  onSubmit: (data: Record<string, any>) => void;
}

export const FormRenderer = ({
  schema,
  onSubmit
}: FormRendererProps) => {
  const { values, errors, setValue, submit } =
    useFormEngine(schema);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = submit();
    if (result) onSubmit(result);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: "#ffffff",
        padding: "1.5rem",
        borderRadius: "8px"
      }}
    >
      <h3 style={{ marginBottom: "1rem" }}>{schema.name}</h3>

      {schema.fields.map((field) => (
        <div key={field.id} style={{ marginBottom: "1rem" }}>
          <label
            style={{
              display: "block",
              fontWeight: 500,
              marginBottom: "0.25rem"
            }}
          >
            {field.label}
          </label>

          {field.type === "textarea" ? (
            <textarea
              value={values[field.id]}
              onChange={(e) =>
                setValue(field.id, e.target.value)
              }
              style={{ width: "100%", padding: "0.5rem" }}
            />
          ) : field.type === "select" ? (
            <select
              value={values[field.id]}
              onChange={(e) =>
                setValue(field.id, e.target.value)
              }
              style={{ width: "100%", padding: "0.5rem" }}
            >
              <option value="">Select</option>
              {field.options?.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              value={values[field.id]}
              onChange={(e) =>
                setValue(field.id, e.target.value)
              }
              style={{ width: "100%", padding: "0.5rem" }}
            />
          )}

          {errors[field.id] && (
            <div style={{ color: "#b91c1c", fontSize: "0.8rem" }}>
              {errors[field.id]}
            </div>
          )}
        </div>
      ))}

      <button
        type="submit"
        style={{
          padding: "0.6rem 1.2rem",
          backgroundColor: "#2563eb",
          color: "#ffffff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        Submit
      </button>
    </form>
  );
};

// src/shared/components/Select.tsx

import { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: string[];
}

export const Select = ({
  label,
  options,
  ...props
}: SelectProps) => {
  return (
    <div style={{ marginBottom: "0.75rem" }}>
      {label && (
        <label
          style={{
            display: "block",
            marginBottom: "0.25rem",
            fontWeight: 500
          }}
        >
          {label}
        </label>
      )}

      <select
        {...props}
        style={{
          width: "100%",
          padding: "0.5rem",
          borderRadius: "4px",
          border: "1px solid #cbd5f5"
        }}
      >
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

// src/shared/components/Input.tsx

import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = ({ label, ...props }: InputProps) => {
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

      <input
        {...props}
        style={{
          width: "100%",
          padding: "0.5rem",
          borderRadius: "4px",
          border: "1px solid #cbd5f5"
        }}
      />
    </div>
  );
};

// src/shared/components/Button.tsx

import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
}

export const Button = ({
  variant = "primary",
  children,
  ...props
}: ButtonProps) => {
  const colors = {
    primary: "#2563eb",
    secondary: "#475569",
    danger: "#dc2626"
  };

  return (
    <button
      {...props}
      style={{
        padding: "0.5rem 1rem",
        borderRadius: "4px",
        border: "none",
        backgroundColor: colors[variant],
        color: "#ffffff",
        cursor: "pointer",
        opacity: props.disabled ? 0.6 : 1
      }}
    >
      {children}
    </button>
  );
};

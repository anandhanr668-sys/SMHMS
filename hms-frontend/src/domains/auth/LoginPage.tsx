// src/domains/auth/LoginPage.tsx

import { useState } from "react";
import { useLogin } from "./useLogin";

export const LoginPage = () => {
  const { submit, loading, error } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit(email, password);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f8fafc"
      }}
    >
      <form
        onSubmit={onSubmit}
        style={{
          width: "360px",
          padding: "2rem",
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          boxShadow: "0 10px 20px rgba(0,0,0,0.08)"
        }}
      >
        <h2 style={{ marginBottom: "1rem", textAlign: "center" }}>
          HMS Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "0.6rem",
            marginBottom: "0.75rem"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "0.6rem",
            marginBottom: "0.75rem"
          }}
        />

        {error && (
          <div
            style={{
              color: "#b91c1c",
              marginBottom: "0.75rem",
              fontSize: "0.9rem"
            }}
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "0.6rem",
            backgroundColor: "#2563eb",
            color: "#ffffff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

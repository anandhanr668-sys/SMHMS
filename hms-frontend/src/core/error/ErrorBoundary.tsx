// src/core/error/ErrorBoundary.tsx

import React, { ReactNode } from "react";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: string | null;
}

export class ErrorBoundary extends React.Component<
  { children: ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true, error: null };
  }

  componentDidCatch(error: Error) {
    // Save error message to state so we can display stack in UI for debugging
    console.error("💥 UI Crash:", error);
    this.setState({ error: (error && error.stack) || error.message || String(error) });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f8fafc",
            color: "#0f172a",
            flexDirection: "column",
            textAlign: "center",
            padding: "2rem"
          }}
        >
          <h1 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
            Something went wrong
          </h1>
          <p style={{ opacity: 0.8 }}>
            Please refresh the page or contact support.
          </p>

          {this.state.error && (
            <pre
              style={{
                marginTop: "1rem",
                background: "#fff",
                padding: "1rem",
                borderRadius: "8px",
                maxWidth: "900px",
                width: "100%",
                overflow: "auto",
                textAlign: "left",
                color: "#111"
              }}
            >
              {this.state.error}
            </pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

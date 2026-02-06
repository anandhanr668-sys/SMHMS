// src/domains/analytics/AnalyticsPage.tsx

import { useAnalytics } from "./useAnalytics";

export const AnalyticsPage = () => {
  const { metrics, loading } = useAnalytics();

  if (loading) {
    return <div>Loading analytics...</div>;
  }

  return (
    <div>
      <h2 style={{ marginBottom: "1rem" }}>Analytics</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1rem"
        }}
      >
        {metrics.map((metric) => (
          <div
            key={metric.name}
            style={{
              backgroundColor: "#ffffff",
              padding: "1.25rem",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
            }}
          >
            <div
              style={{
                fontSize: "0.9rem",
                color: "#475569",
                marginBottom: "0.25rem"
              }}
            >
              {metric.name}
            </div>

            <div
              style={{
                fontSize: "1.75rem",
                fontWeight: 700,
                color: "#0f172a"
              }}
            >
              {metric.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

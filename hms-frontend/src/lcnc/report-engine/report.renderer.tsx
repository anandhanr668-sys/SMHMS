// src/lcnc/report-engine/report.renderer.tsx

interface ReportRendererProps {
  title: string;
  version: string;
  sections: {
    id: string;
    title: string;
    data: Record<string, any>;
  }[];
  ruleOutcomes: string[];
}

export const ReportRenderer = ({
  title,
  version,
  sections,
  ruleOutcomes
}: ReportRendererProps) => {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: "2rem",
        borderRadius: "8px",
        maxWidth: "800px"
      }}
    >
      <div style={{ marginBottom: "1.5rem" }}>
        <h2>{title}</h2>
        <div style={{ fontSize: "0.85rem", color: "#475569" }}>
          Version: {version}
        </div>
      </div>

      {ruleOutcomes.length > 0 && (
        <div
          style={{
            backgroundColor: "#fef3c7",
            padding: "1rem",
            borderRadius: "6px",
            marginBottom: "1.5rem"
          }}
        >
          <strong>Clinical Alerts</strong>
          <ul>
            {ruleOutcomes.map((msg, idx) => (
              <li key={idx}>{msg}</li>
            ))}
          </ul>
        </div>
      )}

      {sections.map((section) => (
        <div key={section.id} style={{ marginBottom: "1.25rem" }}>
          <h4 style={{ marginBottom: "0.5rem" }}>
            {section.title}
          </h4>

          <table style={{ width: "100%" }}>
            <tbody>
              {Object.entries(section.data).map(([key, value]) => (
                <tr key={key}>
                  <td
                    style={{
                      fontWeight: 500,
                      padding: "0.25rem 0.5rem",
                      width: "40%"
                    }}
                  >
                    {key}
                  </td>
                  <td style={{ padding: "0.25rem 0.5rem" }}>
                    {String(value ?? "-")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

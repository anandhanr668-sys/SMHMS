// src/lcnc/rules-engine/RulesPreview.tsx

import { useRulesEngine } from "./useRulesEngine";
import { Rule } from "./rules.types";
import { useState } from "react";

const demoRules: Rule[] = [
  {
    id: "r1",
    name: "High Severity Alert",
    condition: {
      field: "severity",
      operator: "EQUALS",
      value: "Severe"
    },
    outcome: "⚠️ High severity case"
  },
  {
    id: "r2",
    name: "Senior Patient",
    condition: {
      field: "age",
      operator: "GREATER_THAN",
      value: 60
    },
    outcome: "🧓 Senior patient – special care required"
  }
];

export const RulesPreview = () => {
  const [formData, setFormData] = useState({
    severity: "",
    age: ""
  });

  const { triggered } = useRulesEngine(demoRules, formData);

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: "1.5rem",
        borderRadius: "8px"
      }}
    >
      <h2 style={{ marginBottom: "1rem" }}>Rules</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label>Severity</label>
        <select
          value={formData.severity}
          onChange={(e) =>
            setFormData({ ...formData, severity: e.target.value })
          }
          style={{ width: "100%", padding: "0.5rem" }}
        >
          <option value="">Select</option>
          <option value="Mild">Mild</option>
          <option value="Moderate">Moderate</option>
          <option value="Severe">Severe</option>
        </select>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>Age</label>
        <input
          type="number"
          value={formData.age}
          onChange={(e) =>
            setFormData({ ...formData, age: e.target.value })
          }
          style={{ width: "100%", padding: "0.5rem" }}
        />
      </div>

      {triggered.length > 0 && (
        <div
          style={{
            backgroundColor: "#fef3c7",
            padding: "1rem",
            borderRadius: "6px"
          }}
        >
          <strong>Triggered Rules:</strong>
          <ul>
            {triggered.map((r) => (
              <li key={r.ruleId}>{r.outcome}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

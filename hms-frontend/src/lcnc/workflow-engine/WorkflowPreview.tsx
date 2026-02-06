// src/lcnc/workflow-engine/WorkflowPreview.tsx

import { useState } from "react";
import { useWorkflowEngine } from "./useWorkflowEngine";
import { WorkflowDefinition } from "./workflow.types";

const demoWorkflow: WorkflowDefinition = {
  id: "patient-admission",
  name: "Patient Admission Workflow",
  start: "step-1",
  steps: [
    {
      id: "step-1",
      name: "Registration",
      action: "Register patient",
      next: "step-2"
    },
    {
      id: "step-2",
      name: "Doctor Review",
      action: "Doctor initial assessment",
      next: "step-3"
    },
    {
      id: "step-3",
      name: "High Severity Check",
      condition: {
        field: "severity",
        equals: "Severe"
      },
      action: "Notify senior doctor",
      next: "step-4"
    },
    {
      id: "step-4",
      name: "Admission",
      action: "Admit patient to ward"
    }
  ]
};

export const WorkflowPreview = () => {
  const [severity, setSeverity] = useState("");

  const { executedSteps, actions } = useWorkflowEngine(
    demoWorkflow,
    { severity }
  );

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: "1.5rem",
        borderRadius: "8px"
      }}
    >
      <h3 style={{ marginBottom: "1rem" }}>
        Workflow Engine Preview
      </h3>

      <div style={{ marginBottom: "1rem" }}>
        <label>Severity</label>
        <select
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
          style={{ width: "100%", padding: "0.5rem" }}
        >
          <option value="">Select</option>
          <option value="Mild">Mild</option>
          <option value="Moderate">Moderate</option>
          <option value="Severe">Severe</option>
        </select>
      </div>

      {executedSteps.length > 0 && (
        <div
          style={{
            backgroundColor: "#f1f5f9",
            padding: "1rem",
            borderRadius: "6px"
          }}
        >
          <strong>Executed Steps</strong>
          <ol>
            {executedSteps.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>

          <strong>Actions</strong>
          <ul>
            {actions.map((action, idx) => (
              <li key={idx}>{action}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

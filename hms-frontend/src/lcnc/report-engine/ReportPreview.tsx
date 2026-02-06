// src/lcnc/report-engine/ReportPreview.tsx

import { useReportEngine } from "./useReportEngine";
import { ReportRenderer } from "./report.renderer";
import { ReportTemplate } from "./report.types";

const demoTemplate: ReportTemplate = {
  id: "clinical-summary",
  name: "Clinical Summary Report",
  version: "1.0.0",
  sections: [
    {
      id: "patient",
      title: "Patient Information",
      fields: ["patientName", "age", "gender"]
    },
    {
      id: "clinical",
      title: "Clinical Details",
      fields: ["complaint", "diagnosis", "severity"]
    }
  ]
};

const demoContext = {
  formData: {
    patientName: "Ravi Kumar",
    age: 65,
    gender: "Male",
    complaint: "Chest pain",
    diagnosis: "Hypertension",
    severity: "Severe"
  },
  ruleOutcomes: [
    "⚠️ High severity case",
    "🧓 Senior patient – special care required"
  ]
};

export const ReportPreview = () => {
  const report = useReportEngine(demoTemplate, demoContext);

  return (
    <div style={{ backgroundColor: "#ffffff", padding: "1.5rem", borderRadius: "8px" }}>
      <h2 style={{ marginBottom: "1rem" }}>Reports</h2>
      <ReportRenderer
        title={report.templateName}
        version={report.version}
        sections={report.sections}
        ruleOutcomes={report.ruleOutcomes}
      />
    </div>
  );
};

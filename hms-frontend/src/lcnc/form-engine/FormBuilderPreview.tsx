// src/lcnc/form-engine/FormBuilderPreview.tsx

import { FormRenderer } from "./FormRenderer";
import { FormSchema } from "./form.types";

const demoSchema: FormSchema = {
  id: "clinical-note",
  name: "Clinical Note",
  fields: [
    {
      id: "complaint",
      label: "Chief Complaint",
      type: "text",
      required: true
    },
    {
      id: "diagnosis",
      label: "Diagnosis",
      type: "textarea",
      required: true
    },
    {
      id: "severity",
      label: "Severity",
      type: "select",
      options: ["Mild", "Moderate", "Severe"]
    }
  ]
};

export const FormBuilderPreview = () => {
  const handleSubmit = (data: Record<string, any>) => {
    console.log("🧾 Form Submitted:", data);
  };

  return <FormRenderer schema={demoSchema} onSubmit={handleSubmit} />;
};

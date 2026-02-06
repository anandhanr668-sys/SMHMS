// src/lcnc/report-engine/report.types.ts

export interface ReportSection {
  id: string;
  title: string;
  fields: string[]; // keys from form data
}

export interface ReportTemplate {
  id: string;
  name: string;
  version: string;
  sections: ReportSection[];
}

export interface ReportContext {
  formData: Record<string, any>;
  ruleOutcomes?: string[];
}

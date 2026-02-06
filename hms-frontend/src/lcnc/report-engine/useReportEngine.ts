// src/lcnc/report-engine/useReportEngine.ts

import { ReportTemplate, ReportContext } from "./report.types";

export const useReportEngine = (
  template: ReportTemplate,
  context: ReportContext
) => {
  const renderSections = () => {
    return template.sections.map((section) => {
      const data = section.fields.reduce<Record<string, any>>(
        (acc, fieldKey) => {
          acc[fieldKey] = context.formData[fieldKey];
          return acc;
        },
        {}
      );

      return {
        ...section,
        data
      };
    });
  };

  return {
    templateName: template.name,
    version: template.version,
    sections: renderSections(),
    ruleOutcomes: context.ruleOutcomes ?? []
  };
};

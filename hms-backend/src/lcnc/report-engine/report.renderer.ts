// src/lcnc/report-engine/report.renderer.ts

import { ReportTemplate } from "./report.template.js";

export interface RenderedReportSection {
  title: string;
  content: Record<string, unknown>;
}

export interface RenderedReport {
  sections: RenderedReportSection[];
}

/**
 * Render report using template and data
 */
export const renderReport = (
  template: ReportTemplate,
  data: Record<string, unknown>
): RenderedReport => {
  const sections: RenderedReportSection[] = template.sections.map(
    (section) => {
      const content: Record<string, unknown> = {};

      for (const field of section.fields) {
        content[field] = data[field] ?? null;
      }

      return {
        title: section.title,
        content
      };
    }
  );

  return { sections };
};

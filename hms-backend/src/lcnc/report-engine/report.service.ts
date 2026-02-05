// src/lcnc/report-engine/report.service.ts

import { Report } from "./report.model.js";
import { ReportTemplate } from "./report.template.js";
import { renderReport } from "./report.renderer.js";
import { UUID } from "@shared/types/common.types.js";

export interface GenerateReportInput {
  tenantId: UUID;
  name: string;
  template: ReportTemplate;
  data: Record<string, unknown>;
  outputFormat?: "JSON" | "PDF";
}

export const reportEngineService = {
  generateReport: (input: GenerateReportInput): Report => {
    const rendered = renderReport(input.template, input.data);

    return {
      id: crypto.randomUUID(),
      tenantId: input.tenantId,
      name: input.name,
      templateId: input.template.id,
      version: input.template.version,
      generatedAt: new Date().toISOString(),
      outputFormat: input.outputFormat ?? "JSON",
      data: rendered as unknown as Record<string, unknown>
    };
  }
};

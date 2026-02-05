// src/lcnc/report-engine/report.model.ts

import { UUID } from "@shared/types/common.types.js";

export type ReportOutputFormat = "JSON" | "PDF";

export interface Report {
  id: UUID;
  tenantId: UUID;
  name: string;
  templateId: UUID;
  version: string;
  generatedAt: string;
  outputFormat: ReportOutputFormat;
  data: Record<string, unknown>;
}

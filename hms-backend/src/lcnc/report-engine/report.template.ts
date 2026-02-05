// src/lcnc/report-engine/report.template.ts

import { UUID } from "@shared/types/common.types.js";

export interface ReportTemplateSection {
  title: string;
  fields: string[];
}

export interface ReportTemplate {
  id: UUID;
  tenantId: UUID;
  name: string;
  version: string;
  sections: ReportTemplateSection[];
  isActive: boolean;
  createdAt: string;
}

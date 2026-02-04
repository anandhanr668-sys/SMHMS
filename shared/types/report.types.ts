// shared/types/report.types.ts

import { BaseEntity, UUID, ISODateString } from "./common.types";

export interface MedicalReport extends BaseEntity {
  visitId: UUID;
  templateId: UUID;
  generatedAt: ISODateString;
  data: Record<string, unknown>;
  pdfUrl?: string;
}

export interface GenerateReportRequest {
  visitId: UUID;
  templateId: UUID;
  data: Record<string, unknown>;
}

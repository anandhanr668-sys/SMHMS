// src/domains/reports/dto.ts

export interface GenerateReportDTO {
  visitId: string;
  templateId: string;
  data: Record<string, unknown>;
}

export interface ReportResponseDTO {
  id: string;
  visitId: string;
  templateId: string;
  generatedAt: string;
}

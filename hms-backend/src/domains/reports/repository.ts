// src/domains/reports/repository.ts

import { GenerateReportDTO, ReportResponseDTO } from "./dto.js";

export const reportRepository = {
  generate: async (dto: GenerateReportDTO): Promise<ReportResponseDTO> => {
    return {
      id: "report-id",
      visitId: dto.visitId,
      templateId: dto.templateId,
      generatedAt: new Date().toISOString()
    };
  }
};

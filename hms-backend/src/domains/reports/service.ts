// src/domains/reports/service.ts

import { GenerateReportDTO, ReportResponseDTO } from "./dto.js";
import { reportRepository } from "./repository.js";

export const reportService = {
  generateReport: async (
    dto: GenerateReportDTO
  ): Promise<ReportResponseDTO> => {
    return reportRepository.generate(dto);
  }
};

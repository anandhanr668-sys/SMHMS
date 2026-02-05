// src/domains/visits/repository.ts

import { CreateVisitDTO, VisitResponseDTO } from "./dto.js";

export const visitRepository = {
  create: async (dto: CreateVisitDTO): Promise<VisitResponseDTO> => {
    return {
      id: "visit-id",
      patientId: dto.patientId,
      doctorId: dto.doctorId,
      visitDate: dto.visitDate,
      status: "SCHEDULED"
    };
  }
};

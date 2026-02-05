// src/domains/visits/service.ts

import { CreateVisitDTO, VisitResponseDTO } from "./dto.js";
import { visitRepository } from "./repository.js";

export const visitService = {
  createVisit: async (dto: CreateVisitDTO): Promise<VisitResponseDTO> => {
    return visitRepository.create(dto);
  }
};

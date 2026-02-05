// src/domains/insurance/service.ts

import { CreateInsuranceDTO, InsuranceResponseDTO } from "./dto.js";
import { insuranceRepository } from "./repository.js";

export const insuranceService = {
  addInsurance: async (
    dto: CreateInsuranceDTO
  ): Promise<InsuranceResponseDTO> => {
    return insuranceRepository.create(dto);
  }
};

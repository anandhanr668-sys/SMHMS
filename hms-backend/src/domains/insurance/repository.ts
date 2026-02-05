// src/domains/insurance/repository.ts

import { CreateInsuranceDTO, InsuranceResponseDTO } from "./dto.js";

export const insuranceRepository = {
  create: async (
    dto: CreateInsuranceDTO
  ): Promise<InsuranceResponseDTO> => {
    return {
      id: "insurance-id",
      provider: dto.provider,
      policyNumber: dto.policyNumber,
      status: "ACTIVE"
    };
  }
};

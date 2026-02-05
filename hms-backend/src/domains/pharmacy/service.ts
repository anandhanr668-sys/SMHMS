// src/domains/pharmacy/service.ts

import { DispenseMedicineDTO, PharmacyResponseDTO } from "./dto.js";
import { pharmacyRepository } from "./repository.js";

export const pharmacyService = {
  dispenseMedicine: async (
    dto: DispenseMedicineDTO
  ): Promise<PharmacyResponseDTO> => {
    return pharmacyRepository.dispense(dto);
  }
};

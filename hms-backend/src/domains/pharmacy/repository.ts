// src/domains/pharmacy/repository.ts

import { DispenseMedicineDTO, PharmacyResponseDTO } from "./dto.js";

export const pharmacyRepository = {
  dispense: async (
    dto: DispenseMedicineDTO
  ): Promise<PharmacyResponseDTO> => {
    return {
      id: "pharmacy-txn-id",
      medicineName: dto.medicineName,
      quantity: dto.quantity,
      dispensedAt: new Date().toISOString()
    };
  }
};

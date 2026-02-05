// src/domains/wards-beds/service.ts

import { BedStatusUpdateDTO, BedResponseDTO } from "./dto.js";
import { bedRepository } from "./repository.js";

export const bedService = {
  updateBedStatus: async (
    dto: BedStatusUpdateDTO
  ): Promise<BedResponseDTO> => {
    return bedRepository.updateStatus(dto);
  }
};

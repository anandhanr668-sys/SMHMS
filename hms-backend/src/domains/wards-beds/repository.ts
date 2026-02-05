// src/domains/wards-beds/repository.ts

import { BedStatusUpdateDTO, BedResponseDTO } from "./dto.js";

export const bedRepository = {
  updateStatus: async (
    dto: BedStatusUpdateDTO
  ): Promise<BedResponseDTO> => {
    return {
      id: dto.bedId,
      ward: "General",
      status: dto.status
    };
  }
};

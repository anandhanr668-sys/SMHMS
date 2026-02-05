// src/domains/staff/service.ts

import { CreateStaffDTO, StaffResponseDTO } from "./dto.js";
import { staffRepository } from "./repository.js";

export const staffService = {
  createStaff: async (
    dto: CreateStaffDTO
  ): Promise<StaffResponseDTO> => {
    return staffRepository.create(dto);
  }
};

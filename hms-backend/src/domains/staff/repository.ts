// src/domains/staff/repository.ts

import { CreateStaffDTO, StaffResponseDTO } from "./dto.js";

export const staffRepository = {
  create: async (dto: CreateStaffDTO): Promise<StaffResponseDTO> => {
    return {
      id: "staff-id",
      name: dto.name,
      role: dto.role
    };
  }
};

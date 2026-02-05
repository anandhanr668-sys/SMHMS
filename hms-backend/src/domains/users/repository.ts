// src/domains/users/repository.ts
import { CreateUserDTO } from "./dto.js";

import { UserResponseDTO } from "./dto.js";

export const userRepository = {
  create: async (dto: CreateUserDTO): Promise<UserResponseDTO> => {
    return {
      id: "user-id",
      email: dto.email,
      role: dto.role
    };
  }
};

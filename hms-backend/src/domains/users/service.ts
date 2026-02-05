// src/domains/users/service.ts

import { CreateUserDTO, UserResponseDTO } from "./dto.js";
import { userRepository } from "./repository.js";

export const userService = {
  createUser: async (dto: CreateUserDTO): Promise<UserResponseDTO> => {
    return userRepository.create(dto);
  }
};

// src/domains/auth/service.ts

import { LoginDTO, AuthResponseDTO } from "./dto.js";

export const authService = {
  login: async (_dto: LoginDTO): Promise<AuthResponseDTO> => {
    // Placeholder logic
    return {
      token: "dummy-jwt-token",
      expiresIn: "1d"
    };
  }
};

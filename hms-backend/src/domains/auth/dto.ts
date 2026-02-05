// src/domains/auth/dto.ts

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthResponseDTO {
  token: string;
  expiresIn: string;
}

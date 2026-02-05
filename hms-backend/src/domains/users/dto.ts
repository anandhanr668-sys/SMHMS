// src/domains/users/dto.ts

import { Role } from "../../core/rbac/role.model.js";

export interface CreateUserDTO {
  email: string;
  role: Role;
}

export interface UserResponseDTO {
  id: string;
  email: string;
  role: Role;
}

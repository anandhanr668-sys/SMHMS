// shared/types/user.types.ts

import { BaseEntity, UUID } from "./common.types";
import { UserRole } from "./auth.types";

export interface User extends BaseEntity {
  email: string;
  role: UserRole;
  isActive: boolean;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  role: UserRole;
}

export interface UpdateUserRequest {
  role?: UserRole;
  isActive?: boolean;
}

export interface UserSummary {
  id: UUID;
  email: string;
  role: UserRole;
}

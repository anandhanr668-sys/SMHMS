// src/domains/staff/dto.ts

export interface CreateStaffDTO {
  name: string;
  role: "DOCTOR" | "NURSE" | "FRONTDESK";
}

export interface StaffResponseDTO {
  id: string;
  name: string;
  role: string;
}

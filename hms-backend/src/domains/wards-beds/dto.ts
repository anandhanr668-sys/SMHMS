// src/domains/wards-beds/dto.ts

export interface BedStatusUpdateDTO {
  bedId: string;
  status: "AVAILABLE" | "OCCUPIED" | "MAINTENANCE";
}

export interface BedResponseDTO {
  id: string;
  ward: string;
  status: "AVAILABLE" | "OCCUPIED" | "MAINTENANCE";
}

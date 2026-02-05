// src/domains/visits/dto.ts

export interface CreateVisitDTO {
  patientId: string;
  doctorId: string;
  visitDate: string;
}

export interface VisitResponseDTO {
  id: string;
  patientId: string;
  doctorId: string;
  visitDate: string;
  status: "SCHEDULED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
}

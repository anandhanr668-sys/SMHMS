// src/domains/patients/dto.ts

export interface CreatePatientDTO {
  firstName: string;
  lastName: string;
}

export interface PatientResponseDTO {
  id: string;
  firstName: string;
  lastName: string;
}

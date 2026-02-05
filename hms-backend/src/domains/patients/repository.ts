// src/domains/patients/repository.ts

import { CreatePatientDTO, PatientResponseDTO } from "./dto.js";

export const patientRepository = {
  create: async (dto: CreatePatientDTO): Promise<PatientResponseDTO> => {
    return {
      id: "patient-id",
      firstName: dto.firstName,
      lastName: dto.lastName
    };
  }
};

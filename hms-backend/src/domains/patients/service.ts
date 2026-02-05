// src/domains/patients/service.ts

import { CreatePatientDTO, PatientResponseDTO } from "./dto.js";
import { patientRepository } from "./repository.js";

export const patientService = {
  createPatient: async (
    dto: CreatePatientDTO
  ): Promise<PatientResponseDTO> => {
    return patientRepository.create(dto);
  }
};

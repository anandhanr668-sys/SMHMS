// shared/types/patient.types.ts

import { BaseEntity, UUID, ISODateString } from "./common.types";

export type Gender = "MALE" | "FEMALE" | "OTHER";

export interface Patient extends BaseEntity {
  firstName: string;
  lastName: string;
  dob: ISODateString;
  gender: Gender;
  contactNumber: string;
}

export interface CreatePatientRequest {
  firstName: string;
  lastName: string;
  dob: ISODateString;
  gender: Gender;
  contactNumber: string;
}

export interface PatientSummary {
  id: UUID;
  firstName: string;
  lastName: string;
}

// src/domains/insurance/dto.ts

export interface CreateInsuranceDTO {
  patientId: string;
  provider: string;
  policyNumber: string;
}

export interface InsuranceResponseDTO {
  id: string;
  provider: string;
  policyNumber: string;
  status: "ACTIVE" | "EXPIRED";
}

// src/domains/pharmacy/dto.ts

export interface DispenseMedicineDTO {
  patientId: string;
  medicineName: string;
  quantity: number;
}

export interface PharmacyResponseDTO {
  id: string;
  medicineName: string;
  quantity: number;
  dispensedAt: string;
}

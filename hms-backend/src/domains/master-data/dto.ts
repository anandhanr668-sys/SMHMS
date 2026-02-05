// src/domains/master-data/dto.ts

export interface CreateMasterDataDTO {
  type: string;
  code: string;
  label: string;
}

export interface MasterDataResponseDTO {
  id: string;
  type: string;
  code: string;
  label: string;
}

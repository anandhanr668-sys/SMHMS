// src/domains/master-data/repository.ts

import {
  CreateMasterDataDTO,
  MasterDataResponseDTO
} from "./dto.js";

export const masterDataRepository = {
  create: async (
    dto: CreateMasterDataDTO
  ): Promise<MasterDataResponseDTO> => {
    return {
      id: "master-data-id",
      type: dto.type,
      code: dto.code,
      label: dto.label
    };
  }
};

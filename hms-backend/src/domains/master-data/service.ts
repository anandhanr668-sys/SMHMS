// src/domains/master-data/service.ts

import {
  CreateMasterDataDTO,
  MasterDataResponseDTO
} from "./dto.js";
import { masterDataRepository } from "./repository.js";

export const masterDataService = {
  createEntry: async (
    dto: CreateMasterDataDTO
  ): Promise<MasterDataResponseDTO> => {
    return masterDataRepository.create(dto);
  }
};

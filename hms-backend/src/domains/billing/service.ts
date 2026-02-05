// src/domains/billing/service.ts

import { CreateInvoiceDTO, InvoiceResponseDTO } from "./dto.js";
import { billingRepository } from "./repository.js";

export const billingService = {
  createInvoice: async (
    dto: CreateInvoiceDTO
  ): Promise<InvoiceResponseDTO> => {
    return billingRepository.createInvoice(dto);
  }
};

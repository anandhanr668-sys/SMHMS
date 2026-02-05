// src/domains/billing/repository.ts

import { CreateInvoiceDTO, InvoiceResponseDTO } from "./dto.js";

export const billingRepository = {
  createInvoice: async (
    dto: CreateInvoiceDTO
  ): Promise<InvoiceResponseDTO> => {
    const totalAmount = dto.items.reduce(
      (sum, item) => sum + item.amount,
      0
    );

    return {
      id: "invoice-id",
      patientId: dto.patientId,
      totalAmount,
      status: "DRAFT"
    };
  }
};

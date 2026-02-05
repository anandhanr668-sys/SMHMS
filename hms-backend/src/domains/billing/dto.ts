// src/domains/billing/dto.ts

export interface CreateInvoiceDTO {
  patientId: string;
  visitId?: string;
  items: {
    description: string;
    amount: number;
  }[];
}

export interface InvoiceResponseDTO {
  id: string;
  patientId: string;
  totalAmount: number;
  status: "DRAFT" | "ISSUED" | "PAID" | "CANCELLED";
}

// shared/types/billing.types.ts

import { BaseEntity, UUID, ISODateString } from "./common.types";

export type InvoiceStatus = "DRAFT" | "ISSUED" | "PAID" | "CANCELLED";

export interface InvoiceItem {
  description: string;
  amount: number;
}

export interface Invoice extends BaseEntity {
  patientId: UUID;
  visitId?: UUID;
  issuedAt: ISODateString;
  status: InvoiceStatus;
  items: InvoiceItem[];
  totalAmount: number;
}

export interface CreateInvoiceRequest {
  patientId: UUID;
  visitId?: UUID;
  items: InvoiceItem[];
}

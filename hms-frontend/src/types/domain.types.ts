// src/types/domain.types.ts

import { BaseEntity, ID } from "./common.types";

/* ---------- PATIENT ---------- */
export interface Patient extends BaseEntity {
  firstName: string;
  lastName: string;
  gender: "MALE" | "FEMALE" | "OTHER";
}

/* ---------- VISIT ---------- */
export interface Visit extends BaseEntity {
  patientId: ID;
  status: "OPEN" | "CLOSED";
  visitDate: string;
}

/* ---------- REPORT ---------- */
export interface Report extends BaseEntity {
  visitId: ID;
  templateVersion: string;
}

/* ---------- BILLING ---------- */
export interface Invoice extends BaseEntity {
  patientId: ID;
  amount: number;
  status: "PAID" | "PENDING" | "CANCELLED";
}

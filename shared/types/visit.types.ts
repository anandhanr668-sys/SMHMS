// shared/types/visit.types.ts

import { BaseEntity, UUID, ISODateString } from "./common.types";

export type VisitStatus =
  | "SCHEDULED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export interface Visit extends BaseEntity {
  patientId: UUID;
  doctorId: UUID;
  visitDate: ISODateString;
  status: VisitStatus;
  notes?: string;
}

export interface CreateVisitRequest {
  patientId: UUID;
  doctorId: UUID;
  visitDate: ISODateString;
}

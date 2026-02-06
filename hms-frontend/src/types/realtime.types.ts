// src/types/realtime.types.ts

import { ID } from "./common.types";

export interface PatientCreatedEvent {
  id: ID;
  name: string;
}

export interface BedStatusChangedEvent {
  bedId: ID;
  status: "AVAILABLE" | "OCCUPIED" | "MAINTENANCE";
}

export interface ReportReadyEvent {
  reportId: ID;
  patientId: ID;
}

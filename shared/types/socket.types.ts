// shared/types/socket.types.ts

import { UUID } from "./common.types";

export interface BedUpdateEvent {
  bedId: UUID;
  status: "AVAILABLE" | "OCCUPIED" | "MAINTENANCE";
}

export interface PatientAdmittedEvent {
  patientId: UUID;
  ward: string;
}

export interface ReportGeneratedEvent {
  reportId: UUID;
  patientId: UUID;
}

export interface ServerToClientEvents {
  "bed:update": BedUpdateEvent;
  "patient:admitted": PatientAdmittedEvent;
  "report:generated": ReportGeneratedEvent;
}

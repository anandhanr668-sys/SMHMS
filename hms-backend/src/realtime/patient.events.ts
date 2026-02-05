// src/realtime/patient.events.ts

import { getIO } from "./socket.js";

export interface PatientAdmittedPayload {
  patientId: string;
  ward: string;
}

/**
 * Emit patient admitted event
 */
export const emitPatientAdmitted = (
  tenantId: string,
  payload: PatientAdmittedPayload
): void => {
  const io = getIO();

  io.to(tenantId).emit("patient:admitted", payload);
};

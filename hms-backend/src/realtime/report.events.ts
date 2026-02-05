// src/realtime/report.events.ts

import { getIO } from "./socket.js";

export interface ReportGeneratedPayload {
  reportId: string;
  patientId: string;
}

/**
 * Emit report generated event
 */
export const emitReportGenerated = (
  tenantId: string,
  payload: ReportGeneratedPayload
): void => {
  const io = getIO();

  io.to(tenantId).emit("report:generated", payload);
};

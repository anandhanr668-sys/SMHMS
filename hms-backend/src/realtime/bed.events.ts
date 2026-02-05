// src/realtime/bed.events.ts

import { getIO } from "./socket.js";

export type BedStatus = "AVAILABLE" | "OCCUPIED" | "MAINTENANCE";

export interface BedStatusUpdatePayload {
  bedId: string;
  status: BedStatus;
}

/**
 * Emit bed status update event
 */
export const emitBedStatusUpdate = (
  tenantId: string,
  payload: BedStatusUpdatePayload
): void => {
  const io = getIO();

  io.to(tenantId).emit("bed:update", payload);
};

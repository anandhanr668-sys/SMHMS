// src/realtime/bed.events.ts

import { getSocket } from "./socketClient";

export interface BedStatusEvent {
  bedId: string;
  status: "AVAILABLE" | "OCCUPIED" | "MAINTENANCE";
}

export const subscribeBedEvents = (
  onBedStatusChange: (event: BedStatusEvent) => void
) => {
  const socket = getSocket();

  socket.on("bed:status", onBedStatusChange);

  return () => {
    socket.off("bed:status", onBedStatusChange);
  };
};

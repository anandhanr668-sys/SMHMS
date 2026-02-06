// src/realtime/patient.events.ts

import { getSocket } from "./socketClient";

export interface PatientRealtimeEvent {
  id: string;
  name: string;
}

export const subscribePatientEvents = (
  onNewPatient: (patient: PatientRealtimeEvent) => void
) => {
  const socket = getSocket();

  socket.on("patient:new", onNewPatient);

  return () => {
    socket.off("patient:new", onNewPatient);
  };
};

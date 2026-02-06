// src/realtime/report.events.ts

import { getSocket } from "./socketClient";

export interface ReportRealtimeEvent {
  reportId: string;
  patientId: string;
}

export const subscribeReportEvents = (
  onReportReady: (event: ReportRealtimeEvent) => void
) => {
  const socket = getSocket();

  socket.on("report:ready", onReportReady);

  return () => {
    socket.off("report:ready", onReportReady);
  };
};

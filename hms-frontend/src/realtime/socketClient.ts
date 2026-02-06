// src/realtime/socketClient.ts

import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io("http://localhost:4000", {
      transports: ["websocket"],
      autoConnect: false
    });
  }
  return socket;
};

export const connectSocket = () => {
  const s = getSocket();

  if (!s.connected) {
    s.connect();
    console.log("🔌 Socket connected");
  }
};

export const disconnectSocket = () => {
  if (socket && socket.connected) {
    socket.disconnect();
    console.log("❌ Socket disconnected");
  }
};

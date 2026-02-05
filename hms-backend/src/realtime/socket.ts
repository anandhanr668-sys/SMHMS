// src/realtime/socket.ts

import { Server as HttpServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import { env } from "../config/env.js";

let io: SocketIOServer | null = null;

/**
 * Initialize Socket.IO server
 */
export const initSocket = (httpServer: HttpServer): SocketIOServer => {
  io = new SocketIOServer(httpServer, {
    cors: {
      origin: "*"
    }
  });

  io.on("connection", (socket: Socket) => {
    const tenantId = socket.handshake.headers["x-tenant-id"];

    if (!tenantId) {
      socket.disconnect(true);
      return;
    }

    // Join tenant-specific room
    socket.join(String(tenantId));

    console.log(`🔌 Socket connected: ${socket.id} (tenant: ${tenantId})`);

    socket.on("disconnect", () => {
      console.log(`❌ Socket disconnected: ${socket.id}`);
    });
  });

  console.log(`📡 Socket.IO initialized on port ${env.port}`);

  return io;
};

/**
 * Get Socket.IO instance safely
 */
export const getIO = (): SocketIOServer => {
  if (!io) {
    throw new Error("Socket.IO not initialized");
  }
  return io;
};

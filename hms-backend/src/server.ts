// src/server.ts

import http from "http";
import dotenv from "dotenv";
import { createApp } from "./app.js";

dotenv.config();

const PORT = Number(process.env.BACKEND_PORT) || 4000;

/* -------------------- Create App -------------------- */
const app = createApp();

/* -------------------- Create Server -------------------- */
const server = http.createServer(app);

/* -------------------- Start Listening -------------------- */
server.listen(PORT, () => {
  console.log(`🚑 HMS Backend running at http://localhost:${PORT}`);
});

/* -------------------- Graceful Shutdown -------------------- */
const shutdown = (signal: string) => {
  console.log(`\n🛑 Received ${signal}. Shutting down gracefully...`);
  server.close(() => {
    console.log("✅ Server closed. Goodbye!");
    process.exit(0);
  });
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

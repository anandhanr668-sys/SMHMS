// src/config/logger.ts

type LogLevel = "info" | "warn" | "error";

const log = (level: LogLevel, message: string, meta?: unknown): void => {
  const timestamp = new Date().toISOString();
  const payload = meta ? JSON.stringify(meta) : "";

  // eslint-disable-next-line no-console
  console[level](`[${timestamp}] [${level.toUpperCase()}] ${message}`, payload);
};

export const logger = {
  info: (message: string, meta?: unknown) => log("info", message, meta),
  warn: (message: string, meta?: unknown) => log("warn", message, meta),
  error: (message: string, meta?: unknown) => log("error", message, meta)
};

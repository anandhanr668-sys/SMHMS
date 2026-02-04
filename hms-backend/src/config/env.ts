// src/config/env.ts

import dotenv from "dotenv";

dotenv.config();

/**
 * Helper to safely read env variables
 */
const getEnv = (key: string, required = true): string => {
  const value = process.env[key];
  if (!value && required) {
    throw new Error(`❌ Missing required environment variable: ${key}`);
  }
  return value || "";
};

export const env = {
  nodeEnv: getEnv("NODE_ENV", false) || "development",

  backendPort: Number(getEnv("BACKEND_PORT", false)) || 4000,
  socketPort: Number(getEnv("SOCKET_PORT", false)) || 4001,

  jwt: {
    secret: getEnv("JWT_SECRET"),
    expiresIn: getEnv("JWT_EXPIRES_IN", false) || "1d"
  },

  db: {
    host: getEnv("POSTGRES_HOST"),
    port: Number(getEnv("POSTGRES_PORT")),
    user: getEnv("POSTGRES_USER"),
    password: getEnv("POSTGRES_PASSWORD"),
    database: getEnv("POSTGRES_DB")
  },

  s3: {
    enabled: Boolean(process.env.AWS_S3_BUCKET),
    region: process.env.AWS_REGION || "",
    bucket: process.env.AWS_S3_BUCKET || "",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ""
  }
};

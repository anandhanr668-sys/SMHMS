import dotenv from "dotenv";

/**
 * Load environment variables
 * (only once, at app startup)
 */
dotenv.config();

/**
 * Helper to read required env vars
 */
function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`❌ Missing required environment variable: ${key}`);
  }
  return value;
}

/**
 * Helper to read optional env vars with default
 */
function optionalEnv(key: string, defaultValue: string): string {
  return process.env[key] ?? defaultValue;
}

/**
 * Helper to read either of multiple env keys (legacy support)
 */
function oneOfEnv(keys: string[], defaultValue?: string): string {
  for (const k of keys) {
    if (process.env[k]) return process.env[k] as string;
  }
  if (defaultValue !== undefined) return defaultValue;
  throw new Error(`❌ Missing required environment variable (one of): ${keys.join("|")}`);
}

/**
 * Application Environment
 */
export const env = {
  /* ======================================================
   * APP
   * ====================================================== */
  nodeEnv: optionalEnv("NODE_ENV", "development"),
  port: Number(optionalEnv("BACKEND_PORT", "4000")),

  /* ======================================================
   * SECURITY / AUTH
   * ====================================================== */
  jwtSecret: requireEnv("JWT_SECRET"),
  jwtExpiresIn: optionalEnv("JWT_EXPIRES_IN", "1d"),

  /* ======================================================
   * DATABASE (PostgreSQL)
   * ====================================================== */
  db: {
    // Legacy support: prefer DB_* but accept POSTGRES_* variables too
    host: oneOfEnv(["DB_HOST", "POSTGRES_HOST"], "localhost"),
    port: Number(optionalEnv("DB_PORT", optionalEnv("POSTGRES_PORT", "5432"))),
    name: oneOfEnv(["DB_NAME", "POSTGRES_DB"]),
    user: oneOfEnv(["DB_USER", "POSTGRES_USER"], "postgres"),
    password: oneOfEnv(["DB_PASSWORD", "POSTGRES_PASSWORD"], "postgres"),
    ssl: optionalEnv("DB_SSL", "false") === "true",
  },

  /* ======================================================
   * MULTI-TENANCY
   * ====================================================== */
  tenant: {
    headerName: optionalEnv("TENANT_HEADER", "x-tenant-id"),
    defaultTenant: optionalEnv("DEFAULT_TENANT_ID", ""),
  },

  /* ======================================================
   * STORAGE (S3 / MinIO – optional for now)
   * ====================================================== */
  s3: {
    enabled: optionalEnv("S3_ENABLED", "false") === "true",
    endpoint: optionalEnv("S3_ENDPOINT", ""),
    accessKey: optionalEnv("S3_ACCESS_KEY", ""),
    secretKey: optionalEnv("S3_SECRET_KEY", ""),
    bucket: optionalEnv("S3_BUCKET", ""),
    region: optionalEnv("S3_REGION", "us-east-1"),
  },

  /* ======================================================
   * LOGGING
   * ====================================================== */
  logging: {
    level: optionalEnv("LOG_LEVEL", "info"),
  },
};

/**
 * Final safety check (optional but recommended)
 */
if (env.nodeEnv === "production") {
  if (env.jwtSecret.length < 32) {
    throw new Error("❌ JWT_SECRET must be at least 32 characters in production");
  }
}
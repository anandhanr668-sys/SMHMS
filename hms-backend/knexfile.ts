import dotenv from "dotenv";
import type { Knex } from "knex";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

/**
 * ESM-safe __dirname (required for ts-node + Windows)
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Small helper to guarantee env vars are strings
 * (prevents SCRAM & auth issues)
 */
function env(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (typeof value !== "string") {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      host: env("DB_HOST", "localhost"),
      port: Number(env("DB_PORT", "5432")),
      user: env("DB_USER", "postgres"),
      password: env("DB_PASSWORD", "postgres"),
      database: env("DB_NAME", "hms_db"),
    },

    migrations: {
      directory: path.resolve(__dirname, "src/migrations"),
      tableName: "knex_migrations",
    },

    seeds: {
      directory: path.resolve(__dirname, "src/seeders"),
    },
  },
};

export default config;
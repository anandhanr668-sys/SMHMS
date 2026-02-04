// src/config/db.ts

import knex, { Knex } from "knex";
import { env } from "./env.js";

export const db: Knex = knex({
  client: "pg",
  connection: {
    host: env.db.host,
    port: env.db.port,
    user: env.db.user,
    password: env.db.password,
    database: env.db.database
  },
  pool: {
    min: 2,
    max: 10
  }
});

/**
 * Simple DB health check
 */
export const checkDbConnection = async (): Promise<void> => {
  await db.raw("SELECT 1");
};

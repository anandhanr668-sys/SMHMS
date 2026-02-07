import knex from "knex";
import config from "./knex.migrate.config.js";

const env = process.env.NODE_ENV || "development";

async function run() {
  console.log(`Running migrations for env: ${env}`);

  const db = knex(config[env]);

  await db.migrate.latest();

  console.log("Migrations completed");

  await db.destroy();
}

run().catch((err) => {
  console.error("Migration failed", err);
  process.exit(1);
});

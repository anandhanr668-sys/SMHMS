// src/migrations/009_create_master_data.ts
import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("master_data", (table) => {
    table.uuid("id").primary();
    table.string("code").notNullable();
    table.string("label").notNullable();
    table.string("type").notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("master_data");
}

import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("master_data", (table) => {
    table.uuid("id").primary();
    table.string("key").notNullable();
    table.string("value").notNullable();
    table.string("category").notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("master_data");
}
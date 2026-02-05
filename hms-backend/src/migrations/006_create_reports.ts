// src/migrations/006_create_reports.ts

import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("reports", (table) => {
    table.uuid("id").primary();

    table
      .uuid("tenant_id")
      .references("id")
      .inTable("tenants")
      .onDelete("CASCADE");

    table
      .uuid("visit_id")
      .references("id")
      .inTable("visits")
      .onDelete("CASCADE");

    table.jsonb("data").notNullable();
    table.string("template_version").notNullable();

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("reports");
}

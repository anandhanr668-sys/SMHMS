// src/migrations/008_create_audit_logs.ts

import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("audit_logs", (table) => {
    table.uuid("id").primary();

    table
      .uuid("tenant_id")
      .references("id")
      .inTable("tenants")
      .onDelete("CASCADE");

    table.uuid("user_id").notNullable();
    table.string("action").notNullable();
    table.string("entity").notNullable();
    table.uuid("entity_id");
    table.jsonb("metadata");

    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("audit_logs");
}

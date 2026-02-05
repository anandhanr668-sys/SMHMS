// src/migrations/007_create_billing.ts

import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("invoices", (table) => {
    table.uuid("id").primary();

    table
      .uuid("tenant_id")
      .references("id")
      .inTable("tenants")
      .onDelete("CASCADE");

    table
      .uuid("patient_id")
      .references("id")
      .inTable("patients")
      .onDelete("CASCADE");

    table.decimal("total_amount", 10, 2).notNullable();
    table.string("status").notNullable();

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("invoices");
}

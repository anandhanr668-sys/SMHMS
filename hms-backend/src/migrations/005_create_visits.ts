// src/migrations/005_create_visits.ts

import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("visits", (table) => {
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

    table
      .uuid("doctor_id")
      .references("id")
      .inTable("users")
      .onDelete("SET NULL");

    table.dateTime("visit_date").notNullable();
    table.string("status").notNullable();

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("visits");
}

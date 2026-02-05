// src/migrations/002_create_roles_permissions.ts

import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("roles", (table) => {
    table.uuid("id").primary();
    table.string("name").notNullable().unique();
  });

  await knex.schema.createTable("permissions", (table) => {
    table.uuid("id").primary();
    table.string("action").notNullable();
    table.string("resource").notNullable();
  });

  await knex.schema.createTable("role_permissions", (table) => {
    table.uuid("role_id").references("id").inTable("roles").onDelete("CASCADE");
    table
      .uuid("permission_id")
      .references("id")
      .inTable("permissions")
      .onDelete("CASCADE");
    table.primary(["role_id", "permission_id"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("role_permissions");
  await knex.schema.dropTableIfExists("permissions");
  await knex.schema.dropTableIfExists("roles");
}

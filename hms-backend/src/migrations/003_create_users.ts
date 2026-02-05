// src/migrations/003_create_users.ts

import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", (table) => {
    table.uuid("id").primary();
    table
      .uuid("tenant_id")
      .references("id")
      .inTable("tenants")
      .onDelete("CASCADE");

    table.string("email").notNullable();
    table.string("password_hash").notNullable();

    table
      .uuid("role_id")
      .references("id")
      .inTable("roles")
      .onDelete("SET NULL");

    table.boolean("is_active").defaultTo(true);
    table.timestamps(true, true);

    table.unique(["tenant_id", "email"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("users");
}

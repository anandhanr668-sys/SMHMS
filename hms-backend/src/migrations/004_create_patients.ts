import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("patients", (table) => {
    table.uuid("id").primary();

    table
      .uuid("tenant_id")
      .notNullable()
      .references("id")
      .inTable("tenants")
      .onDelete("CASCADE");

    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.date("dob").notNullable();

    // ✅ correct FK
    table
      .uuid("gender_id")
      .notNullable()
      .references("id")
      .inTable("master_data");

    table.string("contact_number").notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("patients");
}

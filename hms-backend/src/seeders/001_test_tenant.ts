import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Insert a stable test tenant id if not present
  const id = "00000000-0000-0000-0000-000000000001";
  const existing = await knex("tenants").where({ id }).first();
  if (!existing) {
    await knex("tenants").insert({ id, name: "Test Tenant", is_active: true });
  }
}

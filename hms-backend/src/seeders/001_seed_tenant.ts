// src/seeders/001_seed_tenant.ts

import type { Knex } from "knex";
import crypto from "crypto";

export async function seed(knex: Knex): Promise<void> {
  const existing = await knex("tenants").first();

  if (existing) return;

  await knex("tenants").insert({
    id: crypto.randomUUID(),
    name: "Demo General Hospital",
    is_active: true,
    created_at: knex.fn.now(),
    updated_at: knex.fn.now()
  });
}

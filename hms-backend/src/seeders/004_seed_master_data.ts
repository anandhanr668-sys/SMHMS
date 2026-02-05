// src/seeders/004_seed_master_data.ts

import { Knex } from "knex";
import crypto from "crypto";

export async function seed(knex: Knex): Promise<void> {
  const exists = await knex("master_data").first();
  if (exists) return;

  const entries = [
    { type: "DEPARTMENT", code: "CARD", label: "Cardiology" },
    { type: "DEPARTMENT", code: "ORTH", label: "Orthopedics" },
    { type: "WARD", code: "GEN", label: "General Ward" },
    { type: "WARD", code: "ICU", label: "Intensive Care Unit" }
  ];

  for (const entry of entries) {
    await knex("master_data").insert({
      id: crypto.randomUUID(),
      ...entry,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    });
  }
}

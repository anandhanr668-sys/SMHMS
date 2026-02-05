// src/seeders/003_seed_admin_user.ts

import { Knex } from "knex";
import crypto from "crypto";
import bcrypt from "bcrypt";

export async function seed(knex: Knex): Promise<void> {
  const tenant = await knex("tenants").first();
  if (!tenant) return;

  const adminRole = await knex("roles")
    .where({ name: "ADMIN" })
    .first();

  if (!adminRole) return;

  const existingAdmin = await knex("users")
    .where({ email: "admin@demo-hms.com" })
    .first();

  if (existingAdmin) return;

  const passwordHash = await bcrypt.hash("Admin@123", 10);

  await knex("users").insert({
    id: crypto.randomUUID(),
    tenant_id: tenant.id,
    email: "admin@demo-hms.com",
    password_hash: passwordHash,
    role_id: adminRole.id,
    is_active: true,
    created_at: knex.fn.now(),
    updated_at: knex.fn.now()
  });
}

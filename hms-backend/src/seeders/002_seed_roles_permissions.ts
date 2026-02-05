// src/seeders/002_seed_roles_permissions.ts

import type { Knex } from "knex";
import crypto from "crypto";

export async function seed(knex: Knex): Promise<void> {
  const roles = ["ADMIN", "DOCTOR", "NURSE", "FRONTDESK", "PATIENT"];

  for (const role of roles) {
    const exists = await knex("roles").where({ name: role }).first();
    if (!exists) {
      await knex("roles").insert({
        id: crypto.randomUUID(),
        name: role
      });
    }
  }

  const permissions = [
    { action: "create", resource: "patient" },
    { action: "read", resource: "patient" },
    { action: "update", resource: "patient" },
    { action: "create", resource: "visit" },
    { action: "generate", resource: "report" }
  ];

  for (const perm of permissions) {
    const exists = await knex("permissions")
      .where(perm)
      .first();

    if (!exists) {
      await knex("permissions").insert({
        id: crypto.randomUUID(),
        ...perm
      });
    }
  }
}

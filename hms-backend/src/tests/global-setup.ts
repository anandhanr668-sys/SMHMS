// src/tests/global-setup.ts

import { db } from "../config/db.js";
import path from "path";
import { fileURLToPath } from "url";

process.env.NODE_ENV = "test";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEST_TENANT_ID = "00000000-0000-0000-0000-000000000001";

export async function setup() {
  console.log("[global-setup] running migrations once...");

  await db.migrate.latest({
    directory: path.join(__dirname, "../migrations"),
  });

  const existing = await db("tenants")
    .where({ id: TEST_TENANT_ID })
    .first();

  if (!existing) {
    await db("tenants").insert({
      id: TEST_TENANT_ID,
      name: "Test Tenant",
      is_active: true,
    });
  }

  console.log("[global-setup] ready");
}

export async function teardown() {
  console.log("[global-teardown] closing db connection");
  await db.destroy();
}

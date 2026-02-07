// src/tests/workflow.integration.test.ts

import request from "supertest";
import jwt from "jsonwebtoken";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createApp } from "../app.js";
import { db } from "../config/db.js";

const app = createApp();
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

import { v4 as uuidv4 } from "uuid";

let tenantId = uuidv4();
let adminToken: string;

beforeAll(async () => {
  // Ensure migrations are run
  await db.migrate.latest({ directory: __dirname + "/../migrations" });

  // Insert tenant
  await db("tenants").insert({ id: tenantId, name: "Test Tenant", is_active: true });

  // Admin token
  adminToken = jwt.sign({ sub: "admin", role: "ADMIN" }, JWT_SECRET);
});

afterAll(async () => {
  // Clean up: remove tenant and cascade
  await db("lcnc_workflow_audit_logs").where({ tenant_id: tenantId }).del();
  await db("lcnc_workflow_instances").where({ tenant_id: tenantId }).del();
  await db("lcnc_workflow_transitions").where({ tenant_id: tenantId }).del();
  await db("lcnc_workflows").where({ tenant_id: tenantId }).del();
  await db("tenants").where({ id: tenantId }).del();
});

describe("Workflow lifecycle", () => {
  it("creates a workflow, starts instance and moves it", async () => {
    // Create workflow
    const wf = {
      name: "Test WF",
      version: "1",
      initialState: "s1",
      states: [{ id: "s1" }, { id: "s2" }],
      transitions: [{ from: "s1", to: "s2", allowedRoles: ["ADMIN"] }]
    };

    const createRes = await request(app)
      .post("/api/v1/workflows")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(wf)
      .set("x-tenant-id", tenantId);

    expect(createRes.status).toBe(201);
    expect(createRes.body.success).toBe(true);
    const created = createRes.body.data;
    expect(created.name).toBe("Test WF");

    // Start instance
    const startRes = await request(app)
      .post(`/api/v1/${created.id}/start`)
      .set("Authorization", `Bearer ${adminToken}`)
      .set("x-tenant-id", tenantId)
      .send({ data: { patientId: "p1" } });

    expect(startRes.status).toBe(201);
    expect(startRes.body.success).toBe(true);
    const instance = startRes.body.data;
    expect(instance.currentState).toBe("s1");

    // Move instance (allowed role ADMIN)
    const moveRes = await request(app)
      .post(`/api/v1/instances/${instance.id}/move`)
      .set("Authorization", `Bearer ${adminToken}`)
      .set("x-tenant-id", tenantId)
      .send({ nextState: "s2" });

    expect(moveRes.status).toBe(200);
    expect(moveRes.body.success).toBe(true);
    expect(moveRes.body.data.currentState).toBe("s2");
  });
});

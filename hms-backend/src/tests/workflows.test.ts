// src/tests/workflows.test.ts

import request from "supertest";
import { describe, it, expect } from "vitest";
import { createApp } from "../app.js";

describe("Workflows API", () => {
  const app = createApp();

  it("lists workflows (empty)", async () => {
    const res = await request(app).get("/api/v1/workflows").set("x-tenant-id", "test-tenant");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("starts a workflow instance", async () => {
    const workflowDef = { name: "Test", start: "s1", steps: [] };
    const res = await request(app).post("/api/v1/workflows/start").set("x-tenant-id", "test-tenant").send(workflowDef);
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.instance).toHaveProperty("id");
    expect(res.body.instance.currentState).toBe("s1");
  });

  it("moves an instance to next state", async () => {
    const workflowDef = { name: "Test", start: "s1", steps: [] };
    const startRes = await request(app).post("/api/v1/workflows/start").set("x-tenant-id", "test-tenant").send(workflowDef);
    const id = startRes.body.instance.id;

    const moveRes = await request(app)
      .post(`/api/v1/workflows/${id}/move`)
      .set("x-tenant-id", "test-tenant")
      .send({ nextState: "s2" });

    expect(moveRes.status).toBe(200);
    expect(moveRes.body.success).toBe(true);
    expect(moveRes.body.instance.currentState).toBe("s2");
  });
});
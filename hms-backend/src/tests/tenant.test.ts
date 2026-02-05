// src/tests/tenant.test.ts

import request from "supertest";
import { describe, it, expect } from "vitest";
import { createApp } from "../app.js";

describe("Tenant Middleware", () => {
  const app = createApp();

  it("should reject request without tenant header", async () => {
    const res = await request(app).get("/health");

    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe("TENANT_MISSING");
  });

  it("should allow request with tenant header", async () => {
    const res = await request(app)
      .get("/health")
      .set("x-tenant-id", "tenant-123");

    expect(res.status).toBe(200);
  });
});

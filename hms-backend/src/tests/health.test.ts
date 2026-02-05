// src/tests/health.test.ts

import request from "supertest";
import { describe, it, expect } from "vitest";
import { createApp } from "../app.js";

describe("Health API", () => {
  const app = createApp();

  it("should return 200 OK for /health", async () => {
    const res = await request(app)
      .get("/health")
      .set("x-tenant-id", "test-tenant");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.status).toBe("OK");
  });
});

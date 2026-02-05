// src/tests/rbac.test.ts

import { describe, it, expect } from "vitest";
import { hasPermission } from "../core/rbac/access.guard.js";

describe("RBAC Permission Guard", () => {
  it("ADMIN should have all permissions", () => {
    const allowed = hasPermission("ADMIN", {
      action: "delete",
      resource: "anything"
    });

    expect(allowed).toBe(true);
  });

  it("DOCTOR should not manage system", () => {
    const allowed = hasPermission("DOCTOR", {
      action: "manage",
      resource: "system"
    });

    expect(allowed).toBe(false);
  });
});

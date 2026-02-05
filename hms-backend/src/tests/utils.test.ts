// src/tests/utils.test.ts

import { describe, it, expect } from "vitest";
import { toTitleCase } from "../utils/string.util.js";

describe("Utility Functions", () => {
  it("should convert string to title case", () => {
    const result = toTitleCase("general hospital ward");
    expect(result).toBe("General Hospital Ward");
  });
});

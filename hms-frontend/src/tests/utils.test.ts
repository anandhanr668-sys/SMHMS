// src/tests/utils.test.ts

import { describe, it } from "vitest";
import { expect } from "vitest";
import {formatDate,formatCurrency,capitalize} from "../shared/utils";

describe("Shared Utils", () => {
  it("formats date safely", () => {
    const result = formatDate("2024-01-01");
    expect(result).toContain("2024");
  });

  it("formats currency safely", () => {
    const result = formatCurrency(1500);
    expect(result).toContain("₹");
  });

  it("capitalizes string", () => {
    expect(capitalize("patient")).toBe("Patient");
  });
});


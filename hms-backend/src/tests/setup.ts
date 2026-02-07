// src/tests/setup.ts

// Ensure test environment is set for every test file
process.env.NODE_ENV = "test";

// IMPORTANT:
// This file is executed ONCE PER TEST FILE.
// Do NOT run migrations or destroy the DB here.

import { beforeEach } from "vitest";

beforeEach(() => {
  // Keep environment consistent across tests
  process.env.NODE_ENV = "test";
});

// src/tests/setup.ts

import { beforeAll, afterAll } from "vitest";

beforeAll(() => {
  process.env.NODE_ENV = "test";
});

afterAll(() => {
  // cleanup hook (future DB, sockets, etc.)
});

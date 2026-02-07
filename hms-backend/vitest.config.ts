import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Runs ONCE per test file (lightweight only)
    setupFiles: ["./src/tests/setup.ts"],

    // Runs ONCE for the entire test run (DB lifecycle)
    globalSetup: "./src/tests/global-setup.ts",

    globals: true,
    environment: "node",
  },
});

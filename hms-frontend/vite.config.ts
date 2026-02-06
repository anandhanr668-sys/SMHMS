/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],

  /* -------------------- Path Aliases -------------------- */
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  /* -------------------- Dev Server -------------------- */
  server: {
    port: 5173,
    strictPort: true,
  },

  /* -------------------- Preview -------------------- */
  preview: {
    port: 5173,
  },

  /* -------------------- Vitest -------------------- */
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/tests/setup.ts",
  },
});
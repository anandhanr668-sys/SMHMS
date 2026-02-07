import request from "supertest";
import { createApp } from "../src/app.js";

(async () => {
  const app = createApp();
  const res = await request(app).post("/api/v1/workflows/start").set("x-tenant-id", "test-tenant").send({ name: "Test", start: "s1" });
  console.log("status", res.status);
  console.log("body", JSON.stringify(res.body, null, 2));
  process.exit(0);
})();
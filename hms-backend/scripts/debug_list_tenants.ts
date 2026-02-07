import { db } from "../src/config/db.js";

(async () => {
  try {
    const rows = await db("tenants").select("id","name","is_active");
    console.log("tenants:", JSON.stringify(rows, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    await db.destroy();
  }
})();
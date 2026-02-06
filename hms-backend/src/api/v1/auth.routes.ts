import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router = Router();

// demo user (replace with DB later)
// Note: seeded admin in DB is admin@demo-hms.com / Admin@123
const user = {
  id: "1",
  email: "admin@demo-hms.com",
  password: bcrypt.hashSync("Admin@123", 10),
  role: "ADMIN"
};

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== user.email) {
      return res.status(401).json({
        success: false,
        error: { code: "INVALID_CREDENTIALS" }
      });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(401).json({
        success: false,
        error: { code: "INVALID_CREDENTIALS" }
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET || "dev_secret",
      { expiresIn: "8h" }
    );

    // Return accessToken to match frontend expectations
    res.json({
      success: true,
      accessToken: token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: { code: "LOGIN_FAILED" }
    });
  }
});

// GET /auth/me - validate token and return user payload
router.get("/me", async (req, res) => {
  try {
    const auth = req.headers.authorization || req.headers.Authorization;
    if (!auth || !auth.toString().startsWith("Bearer ")) {
      return res.status(401).json({ success: false, error: { code: "MISSING_TOKEN" } });
    }

    const token = auth.toString().replace(/^Bearer\s+/, "");

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET || "dev_secret");
      return res.json({ success: true, user: payload });
    } catch (err) {
      return res.status(401).json({ success: false, error: { code: "INVALID_TOKEN" } });
    }
  } catch (err) {
    return res.status(500).json({ success: false, error: { code: "ME_FAILED" } });
  }
});

export default router;

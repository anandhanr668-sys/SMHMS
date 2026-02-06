import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router = Router();

// demo user (replace with DB later)
const user = {
  id: "1",
  email: "admin@hms.com",
  password: bcrypt.hashSync("admin123", 10),
  role: "admin"
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

    res.json({
      success: true,
      token,
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

export default router;

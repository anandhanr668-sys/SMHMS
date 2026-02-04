// src/api/v1/auth.routes.ts

import { Router, Request, Response } from "express";

const router = Router();

router.post("/login", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Login endpoint (implementation pending)"
  });
});

router.post("/logout", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Logout endpoint (implementation pending)"
  });
});

export default router;

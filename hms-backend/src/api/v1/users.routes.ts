// src/api/v1/users.routes.ts

import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: []
  });
});

router.post("/", (_req: Request, res: Response) => {
  res.status(201).json({
    success: true,
    message: "User created (placeholder)"
  });
});

export default router;

// src/api/v1/visits.routes.ts

import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  // placeholder list endpoint
  res.json({
    success: true,
    data: []
  });
});

router.post("/", (_req: Request, res: Response) => {
  res.status(201).json({
    success: true,
    message: "Visit created (placeholder)"
  });
});

router.get("/:id", (req: Request, res: Response) => {
  res.json({
    success: true,
    visitId: req.params.id
  });
});

export default router;

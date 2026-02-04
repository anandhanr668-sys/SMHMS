// src/api/v1/reportTemplates.routes.ts

import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.json({
    success: true,
    templates: []
  });
});

export default router;

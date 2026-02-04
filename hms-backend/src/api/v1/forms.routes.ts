// src/api/v1/forms.routes.ts

import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: []
  });
});

export default router;

// src/api/v1/analytics.routes.ts

import { Router, Request, Response } from "express";

const router = Router();

router.get("/summary", (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      patients: 0,
      visits: 0,
      revenue: 0
    }
  });
});

export default router;

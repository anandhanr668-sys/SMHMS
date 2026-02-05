// src/domains/visits/controller.ts

import { Request, Response } from "express";
import { visitService } from "./service.js";

export const createVisitController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const visit = await visitService.createVisit(req.body);

  res.status(201).json({
    success: true,
    data: visit
  });
};

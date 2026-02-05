// src/domains/wards-beds/controller.ts

import { Request, Response } from "express";
import { bedService } from "./service.js";

export const updateBedStatusController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const bed = await bedService.updateBedStatus(req.body);

  res.status(200).json({
    success: true,
    data: bed
  });
};

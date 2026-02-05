// src/domains/pharmacy/controller.ts

import { Request, Response } from "express";
import { pharmacyService } from "./service.js";

export const dispenseMedicineController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const result = await pharmacyService.dispenseMedicine(req.body);

  res.status(201).json({
    success: true,
    data: result
  });
};

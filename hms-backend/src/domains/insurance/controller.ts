// src/domains/insurance/controller.ts

import { Request, Response } from "express";
import { insuranceService } from "./service.js";

export const addInsuranceController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const insurance = await insuranceService.addInsurance(req.body);

  res.status(201).json({
    success: true,
    data: insurance
  });
};

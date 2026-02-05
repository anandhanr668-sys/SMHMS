// src/domains/staff/controller.ts

import { Request, Response } from "express";
import { staffService } from "./service.js";

export const createStaffController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const staff = await staffService.createStaff(req.body);

  res.status(201).json({
    success: true,
    data: staff
  });
};

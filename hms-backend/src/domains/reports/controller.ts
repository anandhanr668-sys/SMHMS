// src/domains/reports/controller.ts

import { Request, Response } from "express";
import { reportService } from "./service.js";

export const generateReportController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const report = await reportService.generateReport(req.body);

  res.status(201).json({
    success: true,
    data: report
  });
};

// src/domains/billing/controller.ts

import { Request, Response } from "express";
import { billingService } from "./service.js";

export const createInvoiceController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const invoice = await billingService.createInvoice(req.body);

  res.status(201).json({
    success: true,
    data: invoice
  });
};

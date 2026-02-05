// src/domains/master-data/controller.ts

import { Request, Response } from "express";
import { masterDataService } from "./service.js";

export const createMasterDataController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const entry = await masterDataService.createEntry(req.body);

  res.status(201).json({
    success: true,
    data: entry
  });
};

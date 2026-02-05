// src/domains/auth/controller.ts

import { Request, Response } from "express";
import { authService } from "./service.js";

export const loginController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const result = await authService.login(req.body);

  res.status(200).json({
    success: true,
    data: result
  });
};

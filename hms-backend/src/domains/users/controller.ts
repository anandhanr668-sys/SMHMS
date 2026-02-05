// src/domains/users/controller.ts

import { Request, Response } from "express";
import { userService } from "./service.js";

export const createUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const user = await userService.createUser(req.body);

  res.status(201).json({
    success: true,
    data: user
  });
};

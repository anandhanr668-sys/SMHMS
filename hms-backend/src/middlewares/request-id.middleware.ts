// src/middlewares/request-id.middleware.ts

import { Request, Response, NextFunction } from "express";
import crypto from "crypto";

declare module "express-serve-static-core" {
  interface Request {
    requestId?: string;
  }
}

export const requestIdMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  req.requestId = crypto.randomUUID();
  next();
};

// src/app.ts

import express, { Application, Request, Response } from "express";
import cors from "cors";

/**
 * Creates and configures the Express application.
 * No server binding happens here.
 */
export const createApp = (): Application => {
  const app = express();

  /* -------------------- Global Middlewares -------------------- */
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  /* -------------------- Health Check -------------------- */
  app.get("/health", (_req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      service: "HMS Backend",
      status: "OK",
      timestamp: new Date().toISOString()
    });
  });

  /* -------------------- 404 Handler -------------------- */
  app.use((_req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      error: {
        code: "NOT_FOUND",
        message: "API endpoint not found"
      }
    });
  });

  return app;
};

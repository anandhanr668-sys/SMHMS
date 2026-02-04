// src/app.ts

import express, { Application, Request, Response } from "express";
import cors from "cors";
import apiV1Routes from "./api/v1/index.js";
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
  app.use("/api/v1", apiV1Routes);
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

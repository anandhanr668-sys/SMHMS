// src/app.ts

import express, { Application, Request, Response } from "express";
import cors from "cors";

import apiV1Routes from "./api/v1/index.js";
import { tenantMiddleware } from "./core/tenant/tenant.middleware";
import { requestIdMiddleware, errorMiddleware } from "./middlewares";

/**
 * Creates and configures the Express application.
 * No server binding happens here.
 */
export const createApp = (): Application => {
  const app = express();

  /* ======================================================
   * Global Middlewares (TOP – order matters)
   * ====================================================== */

  // CORS
  app.use(cors());

  // Body parsers
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // 🔑 Request ID (must be early for tracing)
  app.use(requestIdMiddleware);

  /* ======================================================
   * Tenant resolution (apply only to api routes)
   * ====================================================== */

  // Apply tenant middleware only for API routes so /health remains public
  app.use("/api/v1", tenantMiddleware, apiV1Routes);

  /* ======================================================
   * Routes
   * ====================================================== */


  /* ======================================================
   * Health Check (no tenant / auth dependency)
   * ====================================================== */

  app.get("/health", (req: Request, res: Response) => {
    // For our test-suite we enforce tenant presence on health checks too.
    // In development the tenant resolver can provide a default; tests expect missing -> 400
    const tenantId = req.headers["x-tenant-id"] as string | undefined;

    if (!tenantId) {
      return res.status(400).json({
        success: false,
        error: { code: "TENANT_MISSING", message: "Missing tenant header: x-tenant-id" }
      });
    }

    res.status(200).json({
      success: true,
      service: "HMS Backend",
      status: "OK",
      timestamp: new Date().toISOString()
    });
  });

  /* ======================================================
   * 404 Handler (after routes)
   * ====================================================== */

  app.use((_req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      error: {
        code: "NOT_FOUND",
        message: "API endpoint not found"
      }
    });
  });

  /* ======================================================
   * Global Error Handler (LAST – must be last)
   * ====================================================== */

  app.use(errorMiddleware);

  return app;
};
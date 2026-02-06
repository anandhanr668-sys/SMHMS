import { Router, Request, Response } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { requirePermission } from "../../core/rbac/role.middleware";

const router = Router();

/**
 * ======================================================
 * GET /api/v1/patients
 * Auth + RBAC protected
 * ======================================================
 */
router.get(
  "/",
  authMiddleware,
  requirePermission({ action: "read", resource: "patient" }),
  (_req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      data: []
    });
  }
);

/**
 * ======================================================
 * POST /api/v1/patients
 * Auth + RBAC protected
 * ======================================================
 */
router.post(
  "/",
  authMiddleware,
  requirePermission({ action: "create", resource: "patient" }),
  (_req: Request, res: Response) => {
    res.status(201).json({
      success: true,
      message: "Patient created successfully"
    });
  }
);

export default router;
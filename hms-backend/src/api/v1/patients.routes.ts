import { Router, Request, Response } from "express";
import { requirePermission } from "../../core/rbac/role.middleware";

const router = Router();

/**
 * GET /api/v1/patients
 * List patients (RBAC protected: read patient)
 */
router.get(
  "/",
  requirePermission({ action: "read", resource: "patient" }),
  (_req: Request, res: Response) => {
    res.json({
      success: true,
      data: []
    });
  }
);

/**
 * POST /api/v1/patients
 * Create patient (RBAC protected: create patient)
 */
router.post(
  "/",
  requirePermission({ action: "create", resource: "patient" }),
  (_req: Request, res: Response) => {
    res.status(201).json({
      success: true,
      message: "Patient created successfully"
    });
  }
);

export default router;
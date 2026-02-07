// src/api/v1/index.ts

import authRoutes from "./auth.routes.js";
import userRoutes from "./users.routes.js";
import patientRoutes from "./patients.routes.js";
import visitRoutes from "./visits.routes.js";
import reportRoutes from "./reports.routes.js";
import formRoutes from "./forms.routes.js";
import reportTemplateRoutes from "./reportTemplates.routes.js";
import analyticsRoutes from "./analytics.routes.js";
import healthRoutes from "./health.routes.js";
import workflowsRoutes from "./workflows.routes.js";
import { Router, Request, Response } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { workflowRepository } from "../../lcnc/workflow-engine/workflow.repository.js";
import { workflowEngineService } from "../../lcnc/workflow-engine/workflow.service.js";

const router = Router();

// Legacy convenience: start workflow using route: POST /api/v1/:id/start
// This is needed by integration tests that expect this global route.
import { validate as isUuid } from "uuid";

// If param isn't UUID, skip this route (allow sub-routes like /workflows/start to handle it)
const requireUuidParam = (req: Request, _res: Response, next: any) => {
  const maybeId = req.params.id;
  if (!isUuid(maybeId)) {
    return next("route");
  }
  return next();
};

router.post("/:id/start", requireUuidParam, authMiddleware as any, async (req: Request, res: Response) => {
  try {
    const tenantId = (req as any).tenantContext?.tenant?.id;
    if (!tenantId) {
      return res.status(400).json({ success: false, error: { code: "TENANT_MISSING", message: "Missing tenant context" } });
    }

    const workflowId = req.params.id;
    const workflowRow = await workflowRepository.getWorkflowById(tenantId, workflowId);
    if (!workflowRow) {
      return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Workflow not found" } });
    }

    const instance = await workflowEngineService.startWorkflow(tenantId, {
      id: workflowRow.id,
      tenantId: workflowRow.tenant_id,
      name: workflowRow.name,
      version: workflowRow.version,
      status: workflowRow.status as any,
      initialState: workflowRow.initial_state || "",
      states: workflowRow.states,
      transitions: workflowRow.transitions,
      createdAt: workflowRow.created_at
    } as any, req.body?.data);

    console.log("[legacy-start] created instance:", instance);

    return res.status(201).json({ success: true, data: instance });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: { code: "INTERNAL", message: err.message } });
  }
});

// Legacy move by instance id: POST /api/v1/instances/:id/move
router.post("/instances/:id/move", authMiddleware as any, async (req: Request, res: Response) => {
  try {
    const tenantId = (req as any).tenantContext?.tenant?.id;
    if (!tenantId) {
      return res.status(400).json({ success: false, error: { code: "TENANT_MISSING", message: "Missing tenant context" } });
    }

    const instanceId = req.params.id;
    const { nextState } = req.body;
    if (!nextState) {
      return res.status(400).json({ success: false, error: { code: "INVALID_INPUT", message: "Missing nextState" } });
    }

    const instanceRow = await workflowRepository.getInstance(tenantId, instanceId);
    if (!instanceRow) {
      return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Workflow instance not found" } });
    }

    const workflow = await workflowRepository.getWorkflowById(tenantId, instanceRow.workflow_id);
    if (!workflow) {
      return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Workflow not found" } });
    }

    try {
      const updated = await workflowEngineService.moveNext(tenantId, {
        id: workflow.id,
        tenantId: workflow.tenant_id,
        name: workflow.name,
        version: workflow.version,
        status: workflow.status as any,
        initialState: workflow.initial_state || "",
        states: workflow.states,
        transitions: workflow.transitions,
        createdAt: workflow.created_at
      } as any, instanceId, nextState, req.userRole ? { name: req.userRole } as any : undefined);

      return res.json({ success: true, data: updated });
    } catch (e: any) {
      if (e.message === "INVALID_TRANSITION") {
        return res.status(400).json({ success: false, error: { code: "INVALID_TRANSITION", message: "Transition is invalid for this workflow" } });
      }
      if (e.message === "FORBIDDEN") {
        return res.status(403).json({ success: false, error: { code: "FORBIDDEN", message: "Role not allowed to perform this transition" } });
      }
      if (e.message === "INSTANCE_NOT_FOUND") {
        return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Instance not found" } });
      }

      throw e;
    }
  } catch (err: any) {
    return res.status(500).json({ success: false, error: { code: "INTERNAL", message: err.message } });
  }
});

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/patients", patientRoutes);
router.use("/visits", visitRoutes);
router.use("/reports", reportRoutes);
router.use("/forms", formRoutes);
router.use("/workflows", workflowsRoutes);
router.use("/report-templates", reportTemplateRoutes);
router.use("/analytics", analyticsRoutes);

export default router;

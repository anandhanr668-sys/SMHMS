// src/api/v1/workflows.routes.ts

import { Router, Request, Response } from "express";
import { workflowRepository } from "../../lcnc/workflow-engine/workflow.repository.js";
import { workflowEngineService } from "../../lcnc/workflow-engine/workflow.service.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { db } from "../../config/db.js";

const router = Router();

/**
 * List workflows for tenant
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const tenantId = req.tenantContext?.tenant.id;
    if (!tenantId) {
      return res.status(400).json({ success: false, error: { code: "TENANT_MISSING", message: "Missing tenant context" } });
    }

    const rows = await workflowRepository.getWorkflowsForTenant(tenantId);
    return res.json({ success: true, data: rows });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: { code: "INTERNAL", message: err.message } });
  }
});

/**
 * Compatibility: Legacy ad-hoc workflow start (used by existing tests)
 * This creates a minimal persisted workflow and starts an instance (DB-backed).
 */
router.post("/start", async (req: Request, res: Response) => {
  try {
    const tenantId = req.tenantContext?.tenant.id;
    if (!tenantId) {
      return res.status(400).json({ success: false, error: { code: "TENANT_MISSING", message: "Missing tenant context" } });
    }

    const { name, start } = req.body;
    if (!name || !start) {
      return res.status(400).json({ success: false, error: { code: "INVALID_INPUT", message: "Missing required fields: name, start" } });
    }

    // Create a minimal persisted workflow so instances have a workflow_id (tenant enforced)
    const wf = {
      name,
      version: "1",
      initialState: start,
      states: [{ id: start }],
      transitions: []
    } as any;

    const created = await workflowRepository.createWorkflow(tenantId, wf);

    if (!created) {
      return res.status(500).json({ success: false, error: { code: "INTERNAL", message: "Failed to create workflow" } });
    }

    // Start instance
    const inst = await workflowRepository.createInstance(tenantId, created.id, start, req.body?.data);

    if (!inst) {
      return res.status(500).json({ success: false, error: { code: "INTERNAL", message: "Failed to create workflow instance" } });
    }

    // Audit log
    await workflowRepository.insertAuditLog(tenantId, {
      workflowId: created.id,
      instanceId: inst.id,
      action: "WORKFLOW_STARTED",
      details: { initialState: start }
    });

    return res.status(201).json({ success: true, instance: { id: inst.id, currentState: inst.current_state } });
  } catch (err: any) {
    console.error("/workflows/start error:", err && err.stack ? err.stack : err);
    return res.status(500).json({ success: false, error: { code: "INTERNAL", message: err.message } });
  }
});

/**
 * Compatibility: Move instance by instance id (legacy route)
 */
router.post("/:id/move", async (req: Request, res: Response) => {
  try {
    const tenantId = req.tenantContext?.tenant.id;
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

    // Transactional update + audit (legacy flow - no transition validation)
    const updated = await db.transaction(async (trx) => {
      await trx("lcnc_workflow_instances").where({ id: instanceId, tenant_id: tenantId }).update({ current_state: nextState, updated_at: trx.fn.now() });

      const { v4: uuidv4 } = await import("uuid");
      await trx("lcnc_workflow_audit_logs").insert({
        id: uuidv4(),
        tenant_id: tenantId,
        workflow_id: instanceRow.workflow_id,
        instance_id: instanceId,
        action: "WORKFLOW_MOVED",
        details: JSON.stringify({ from: instanceRow.current_state, to: nextState }),
        created_at: trx.fn.now()
      });

      return trx<any>("lcnc_workflow_instances").where({ id: instanceId }).first();
    });

    return res.json({ success: true, instance: { id: updated.id, currentState: updated.current_state } });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: { code: "INTERNAL", message: err.message } });
  }
});

/**
 * Create a workflow (admin only)
 */
router.post("/", authMiddleware as any, async (req: Request, res: Response) => {
  try {
    console.log("[workflows:create] tenant:", req.tenantContext?.tenant?.id, "userRole:", req.userRole);
    // require ADMIN role
    if (req.userRole !== "ADMIN") {
      return res.status(403).json({ success: false, error: { code: "FORBIDDEN", message: "Admin role required" } });
    }

    const tenantId = req.tenantContext?.tenant.id;
    if (!tenantId) {
      return res.status(400).json({ success: false, error: { code: "TENANT_MISSING", message: "Missing tenant context" } });
    }

    const { id, name, version, initialState, states, transitions, status } = req.body;
    if (!name || !version || !states || !transitions) {
      return res.status(400).json({ success: false, error: { code: "INVALID_INPUT", message: "Missing required fields: name, version, states, transitions" } });
    }

    const wf = {
      id,
      tenantId,
      name,
      version,
      status: status || "ACTIVE",
      initialState,
      states,
      transitions
    };

    const created = await workflowRepository.createWorkflow(tenantId, wf as any);

    return res.status(201).json({ success: true, data: created });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: { code: "INTERNAL", message: err.message } });
  }
});

/**
 * Start a workflow instance
 */
router.post("/:id/start", authMiddleware as any, async (req: Request, res: Response) => {
  try {
    const tenantId = req.tenantContext?.tenant.id;
    console.log("[workflows:start] tenant:", tenantId, "params.id:", req.params.id);
    if (!tenantId) {
      return res.status(400).json({ success: false, error: { code: "TENANT_MISSING", message: "Missing tenant context" } });
    }

    const workflowId = req.params.id;
    const workflow = await workflowRepository.getWorkflowById(tenantId, workflowId);
    console.log("[workflows:start] workflow row:", workflow);
    if (!workflow) {
      return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Workflow not found" } });
    }

    // start instance via service
    const instance = await workflowEngineService.startWorkflow(tenantId, {
      id: workflow.id,
      tenantId: workflow.tenant_id,
      name: workflow.name,
      version: workflow.version,
      status: workflow.status as any,
      initialState: workflow.initial_state || "",
      states: workflow.states,
      transitions: workflow.transitions,
      createdAt: workflow.created_at
    } as any, req.body?.data);

    return res.status(201).json({ success: true, data: instance });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: { code: "INTERNAL", message: err.message } });
  }
});

/**
 * Move instance to next state
 */
router.post("/instances/:id/move", authMiddleware as any, async (req: Request, res: Response) => {
  try {
    const tenantId = req.tenantContext?.tenant.id;
    if (!tenantId) {
      return res.status(400).json({ success: false, error: { code: "TENANT_MISSING", message: "Missing tenant context" } });
    }

    const instanceId = req.params.id;
    const { nextState } = req.body;
    if (!nextState) {
      return res.status(400).json({ success: false, error: { code: "INVALID_INPUT", message: "Missing nextState" } });
    }

    console.log("[workflows:move] tenantId:", tenantId, "instanceId:", instanceId);
    const instanceRow = await workflowRepository.getInstance(tenantId, instanceId);
    console.log("[workflows:move] looked up instance:", instanceRow);
    if (!instanceRow) {
      return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Workflow instance not found" } });
    }

    const workflow = await workflowRepository.getWorkflowById(tenantId, instanceRow.workflow_id);
    if (!workflow) {
      return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Workflow not found" } });
    }

    // perform transition
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

export default router;

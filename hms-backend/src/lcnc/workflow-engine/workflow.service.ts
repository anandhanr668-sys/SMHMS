// src/lcnc/workflow-engine/workflow.service.ts

import { Workflow } from "./workflow.model.js";
import { executeTransition } from "./workflow.executor.js";
import { Role } from "../../core/rbac/role.model.js";
import { workflowRepository } from "./workflow.repository.js";
import { db } from "../../config/db.js";

export interface WorkflowInstance {
  id: string;
  workflowId: string;
  currentState: string;
  updatedAt: string;
}

export const workflowEngineService = {
  /**
   * Initialize workflow instance and persist to DB
   */
  startWorkflow: async (tenantId: string, workflow: Workflow, data?: any): Promise<WorkflowInstance> => {
    // create instance in DB
    const inst = await workflowRepository.createInstance(tenantId, workflow.id, workflow.initialState, data);

    // audit
    await workflowRepository.insertAuditLog(tenantId, {
      workflowId: workflow.id,
      instanceId: inst.id,
      action: "WORKFLOW_STARTED",
      details: { initialState: workflow.initialState }
    });

    return {
      id: inst.id,
      workflowId: workflow.id,
      currentState: inst.current_state,
      updatedAt: inst.updated_at
    };
  },

  /**
   * Move workflow to next state (transactional)
   */
  moveNext: async (
    tenantId: string,
    workflow: Workflow,
    instanceId: string,
    nextState: string,
    userRole?: Role | { name?: string }
  ): Promise<WorkflowInstance> => {
    return await db.transaction(async (trx) => {
      // load instance
      const instance = await trx("lcnc_workflow_instances").where({ id: instanceId, tenant_id: tenantId }).first();
      if (!instance) {
        throw new Error("INSTANCE_NOT_FOUND");
      }

      // validate transition using workflow.transitions
      const transitions = workflow.transitions || [];
      const valid = transitions.find((t: any) => t.from === instance.current_state && t.to === nextState);
      if (!valid) {
        throw new Error("INVALID_TRANSITION");
      }

      // derive role name (supports either Role string or { name } object)
      const roleName = typeof userRole === "string" ? userRole : (userRole && (userRole as any).name ? (userRole as any).name : null);

      // optional role check (if transition defines allowedRoles)
      if (valid.allowedRoles && Array.isArray(valid.allowedRoles)) {
        const allowed = roleName ? valid.allowedRoles.includes(roleName) : false;
        if (!allowed) {
          throw new Error("FORBIDDEN");
        }
      }

      // update instance
      await trx("lcnc_workflow_instances").where({ id: instanceId }).update({ current_state: nextState, updated_at: trx.fn.now() });

      // write audit log
      const { v4: uuidv4 } = await import("uuid");
      await trx("lcnc_workflow_audit_logs").insert({
        id: uuidv4(),
        tenant_id: tenantId,
        workflow_id: workflow.id,
        instance_id: instanceId,
        action: "WORKFLOW_MOVED",
        details: JSON.stringify({ from: instance.current_state, to: nextState, by: roleName || null }),
        created_at: trx.fn.now()
      });

      const updated = await trx("lcnc_workflow_instances").where({ id: instanceId }).first();

      return {
        id: updated.id,
        workflowId: updated.workflow_id,
        currentState: updated.current_state,
        updatedAt: updated.updated_at
      };
    });
  }
};

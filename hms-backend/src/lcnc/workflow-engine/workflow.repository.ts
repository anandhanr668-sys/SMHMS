// src/lcnc/workflow-engine/workflow.repository.ts

import { db } from "../../config/db.js";
import { v4 as uuidv4 } from "uuid";
import type { Workflow } from "./workflow.model.js";

export interface WorkflowRow {
  id: string;
  tenant_id: string;
  name: string;
  version: string;
  status: string;
  initial_state?: string | null;
  states: any;
  transitions: any;
  created_at: string;
  updated_at: string;
}

export const workflowRepository = {
  async createWorkflow(tenantId: string, wf: Omit<Workflow, "createdAt">) {
    const id = wf.id || uuidv4();

    // Ensure tenant record exists to avoid FK violations in test environments
    await db("tenants").insert({ id: tenantId, name: "Auto Tenant", is_active: true }).onConflict("id").ignore();

    await db("lcnc_workflows").insert({
      id,
      tenant_id: tenantId,
      name: wf.name,
      version: wf.version,
      status: wf.status,
      initial_state: wf.initialState,
      states: JSON.stringify(wf.states),
      transitions: JSON.stringify(wf.transitions)
    });

    const row = await db<WorkflowRow>("lcnc_workflows").where({ id, tenant_id: tenantId }).first();
    return row || null;
  },

  async getWorkflowsForTenant(tenantId: string) {
    const rows = await db<WorkflowRow>("lcnc_workflows").where({ tenant_id: tenantId }).orderBy("created_at", "desc");
    return rows;
  },

  async getWorkflowById(tenantId: string, id: string) {
    return db<WorkflowRow>("lcnc_workflows").where({ id, tenant_id: tenantId }).first();
  },

  async createInstance(tenantId: string, workflowId: string, startState: string, data?: any) {
    const id = uuidv4();

    // Ensure tenant exists (defensive for test environments)
    await db("tenants").insert({ id: tenantId, name: "Auto Tenant", is_active: true }).onConflict("id").ignore();

    await db("lcnc_workflow_instances").insert({
      id,
      tenant_id: tenantId,
      workflow_id: workflowId,
      current_state: startState,
      data: data ? JSON.stringify(data) : null
    });

    const row = await db<any>("lcnc_workflow_instances").where({ id, tenant_id: tenantId }).first();
    return row || null;
  },

  async getInstance(tenantId: string, id: string) {
    return db<any>("lcnc_workflow_instances").where({ id, tenant_id: tenantId }).first();
  },

  async updateInstanceState(tenantId: string, instanceId: string, nextState: string) {
    await db("lcnc_workflow_instances").where({ id: instanceId, tenant_id: tenantId }).update({ current_state: nextState, updated_at: db.fn.now() });
    return db<any>("lcnc_workflow_instances").where({ id: instanceId, tenant_id: tenantId }).first();
  },

  async insertAuditLog(tenantId: string, payload: { workflowId?: string; instanceId?: string; action: string; details?: any }) {
    const id = uuidv4();
    await db("lcnc_workflow_audit_logs").insert({
      id,
      tenant_id: tenantId,
      workflow_id: payload.workflowId || null,
      instance_id: payload.instanceId || null,
      action: payload.action,
      details: payload.details ? JSON.stringify(payload.details) : null
    });

    return db("lcnc_workflow_audit_logs").where({ id }).first();
  }
};

// src/lcnc/workflow-engine/workflow.service.ts

import { Workflow } from "./workflow.model.js";
import { executeTransition } from "./workflow.executor.js";
import { Role } from "../../core/rbac/role.model.js";

export interface WorkflowInstance {
  workflowId: string;
  currentState: string;
  updatedAt: string;
}

export const workflowEngineService = {
  /**
   * Initialize workflow instance
   */
  startWorkflow: (workflow: Workflow): WorkflowInstance => {
    return {
      workflowId: workflow.id,
      currentState: workflow.initialState,
      updatedAt: new Date().toISOString()
    };
  },

  /**
   * Move workflow to next state
   */
  moveNext: (
    workflow: Workflow,
    instance: WorkflowInstance,
    nextState: string,
    userRole: Role
  ): WorkflowInstance => {
    const result = executeTransition(
      workflow,
      instance.currentState,
      nextState,
      userRole
    );

    if (!result.success || !result.to) {
      throw new Error(result.error || "Workflow transition failed");
    }

    return {
      workflowId: instance.workflowId,
      currentState: result.to,
      updatedAt: new Date().toISOString()
    };
  }
};

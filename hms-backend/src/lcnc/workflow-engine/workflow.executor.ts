// src/lcnc/workflow-engine/workflow.executor.ts

import { Workflow } from "./workflow.model.js";
import { Role } from "../../core/rbac/role.model.js";

export interface WorkflowExecutionResult {
  success: boolean;
  from: string;
  to?: string;
  error?: string;
}

/**
 * Execute a workflow transition safely
 */
export const executeTransition = (
  workflow: Workflow,
  currentState: string,
  nextState: string,
  userRole: Role
): WorkflowExecutionResult => {
  if (workflow.status !== "ACTIVE") {
    return {
      success: false,
      from: currentState,
      error: "Workflow is inactive"
    };
  }

  const transition = workflow.transitions.find(
    (t) => t.from === currentState && t.to === nextState
  );

  if (!transition) {
    return {
      success: false,
      from: currentState,
      error: "Invalid workflow transition"
    };
  }

  if (!transition.allowedRoles.includes(userRole)) {
    return {
      success: false,
      from: currentState,
      error: "Role not allowed to perform this transition"
    };
  }

  return {
    success: true,
    from: currentState,
    to: nextState
  };
};

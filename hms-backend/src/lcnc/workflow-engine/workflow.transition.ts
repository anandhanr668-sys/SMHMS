// src/lcnc/workflow-engine/workflow.transition.ts

import { Role } from "../../core/rbac/role.model.js";

export interface WorkflowTransition {
  from: string;
  to: string;
  allowedRoles: Role[];
  condition?: string; // expression key for rules-engine (future)
}

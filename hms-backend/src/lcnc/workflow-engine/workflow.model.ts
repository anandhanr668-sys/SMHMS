// src/lcnc/workflow-engine/workflow.model.ts

import { UUID } from "@shared/types/common.types.js";
import { WorkflowState } from "./workflow.state";
import { WorkflowTransition } from ".";

export type WorkflowStatus = "ACTIVE" | "INACTIVE";

export interface Workflow {
  id: UUID;
  tenantId: UUID;
  name: string;
  version: string;
  status: WorkflowStatus;
  initialState: string;
  states: WorkflowState[];
  transitions: WorkflowTransition[];
  createdAt: string;
}

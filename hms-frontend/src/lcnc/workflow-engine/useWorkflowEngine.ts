// src/lcnc/workflow-engine/useWorkflowEngine.ts

import { WorkflowDefinition } from "./workflow.types";
import { executeWorkflow } from "./workflow.executor";

export const useWorkflowEngine = (
  workflow: WorkflowDefinition,
  data: Record<string, any>
) => {
  const result = executeWorkflow(workflow, data);

  return {
    executedSteps: result.executedSteps,
    actions: result.actions,
    completed: result.executedSteps.length > 0
  };
};

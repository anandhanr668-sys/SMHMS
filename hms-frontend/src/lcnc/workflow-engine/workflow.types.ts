// src/lcnc/workflow-engine/workflow.types.ts

export interface WorkflowCondition {
  field: string;
  equals: any;
}

export interface WorkflowStep {
  id: string;
  name: string;
  condition?: WorkflowCondition;
  action: string;
  next?: string;
}

export interface WorkflowDefinition {
  id: string;
  name: string;
  start: string;
  steps: WorkflowStep[];
}

export interface WorkflowExecutionResult {
  executedSteps: string[];
  actions: string[];
}

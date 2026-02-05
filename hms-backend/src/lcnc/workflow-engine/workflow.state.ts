// src/lcnc/workflow-engine/workflow.state.ts

export interface WorkflowState {
  name: string;
  label: string;
  isTerminal?: boolean;
}

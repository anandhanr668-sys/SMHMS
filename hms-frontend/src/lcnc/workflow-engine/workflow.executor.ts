// src/lcnc/workflow-engine/workflow.executor.ts

import {
  WorkflowDefinition,
  WorkflowExecutionResult,
  WorkflowStep
} from "./workflow.types";

export const executeWorkflow = (
  workflow: WorkflowDefinition,
  data: Record<string, any>
): WorkflowExecutionResult => {
  const executedSteps: string[] = [];
  const actions: string[] = [];

  const stepsMap = workflow.steps.reduce<Record<string, WorkflowStep>>(
    (acc, step) => {
      acc[step.id] = step;
      return acc;
    },
    {}
  );

  let currentStepId: string | undefined = workflow.start;

  while (currentStepId) {
    const step: WorkflowStep | undefined = stepsMap[currentStepId];
    if (!step) break;

    if (step.condition) {
      const value = data[step.condition.field];
      if (value !== step.condition.equals) {
        break;
      }
    }

    executedSteps.push(step.name);
    actions.push(step.action);

    currentStepId = step.next;
  }

  return {
    executedSteps,
    actions
  };
};

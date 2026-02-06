// src/tests/lcnc.test.ts

import { evaluateRule } from "@/lcnc/rules-engine/rule.evaluator";
import { executeWorkflow } from "@/lcnc/workflow-engine/workflow.executor";
import { describe, it, expect } from "vitest";

describe("LCNC Engines", () => {
  it("evaluates rules correctly", () => {
    const result = evaluateRule(
      {
        id: "r1",
        name: "Test Rule",
        condition: {
          field: "severity",
          operator: "EQUALS",
          value: "Severe"
        },
        outcome: "High severity"
      },
      { severity: "Severe" }
    );

    expect(result.triggered).toBe(true);
  });

  it("executes workflow steps safely", () => {
    const result = executeWorkflow(
      {
        id: "wf1",
        name: "Test Workflow",
        start: "step1",
        steps: [
          {
            id: "step1",
            name: "Start",
            action: "Start action"
          }
        ]
      },
      {}
    );

    expect(result.executedSteps.length).toBe(1);
  });
});

// src/lcnc/rules-engine/rule.service.ts

import { Rule } from "./rule.model.js";
import {
  evaluateConditions,
  executeActions
} from "./rule.evaluator.js";

export interface RuleExecutionResult {
  ruleId: string;
  triggered: boolean;
  actions: unknown[];
}

export const ruleEngineService = {
  executeRule: (
    rule: Rule,
    data: Record<string, unknown>
  ): RuleExecutionResult => {
    if (rule.status !== "ACTIVE") {
      return {
        ruleId: rule.id,
        triggered: false,
        actions: []
      };
    }

    const conditionsMet = evaluateConditions(
      rule.conditions,
      data
    );

    if (!conditionsMet) {
      return {
        ruleId: rule.id,
        triggered: false,
        actions: []
      };
    }

    const actions = executeActions(rule.actions);

    return {
      ruleId: rule.id,
      triggered: true,
      actions
    };
  }
};

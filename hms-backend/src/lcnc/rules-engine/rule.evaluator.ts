// src/lcnc/rules-engine/rule.evaluator.ts

import { RuleCondition } from "./rule.condition.js";
import { RuleAction } from "./rule.action.js";

/**
 * Evaluates a single condition against data
 */
const evaluateCondition = (
  condition: RuleCondition,
  data: Record<string, unknown>
): boolean => {
  const actualValue = data[condition.field];

  switch (condition.operator) {
    case "EQUALS":
      return actualValue === condition.value;

    case "NOT_EQUALS":
      return actualValue !== condition.value;

    case "GREATER_THAN":
      return (
        typeof actualValue === "number" &&
        typeof condition.value === "number" &&
        actualValue > condition.value
      );

    case "LESS_THAN":
      return (
        typeof actualValue === "number" &&
        typeof condition.value === "number" &&
        actualValue < condition.value
      );

    case "IN":
      return (
        Array.isArray(condition.value) &&
        condition.value.includes(actualValue)
      );

    default:
      return false;
  }
};

/**
 * Evaluates all conditions of a rule
 */
export const evaluateConditions = (
  conditions: RuleCondition[],
  data: Record<string, unknown>
): boolean => {
  return conditions.every((condition) =>
    evaluateCondition(condition, data)
  );
};

/**
 * Executes rule actions
 * (Currently returns actions to be handled by caller)
 */
export const executeActions = (
  actions: RuleAction[]
): RuleAction[] => {
  return actions;
};

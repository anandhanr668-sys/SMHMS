// src/lcnc/rules-engine/rule.evaluator.ts

import { Rule, RuleResult } from "./rules.types";

export const evaluateRule = (
  rule: Rule,
  data: Record<string, any>
): RuleResult => {
  const { field, operator, value } = rule.condition;
  const inputValue = data[field];

  let triggered = false;

  switch (operator) {
    case "EQUALS":
      triggered = inputValue === value;
      break;

    case "NOT_EQUALS":
      triggered = inputValue !== value;
      break;

    case "GREATER_THAN":
      triggered = Number(inputValue) > Number(value);
      break;

    case "LESS_THAN":
      triggered = Number(inputValue) < Number(value);
      break;

    case "INCLUDES":
      triggered =
        Array.isArray(inputValue) &&
        inputValue.includes(value);
      break;

    default:
      triggered = false;
  }

  return {
    ruleId: rule.id,
    triggered,
    outcome: triggered ? rule.outcome : undefined
  };
};

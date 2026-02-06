// src/lcnc/rules-engine/useRulesEngine.ts

import { Rule, RuleResult } from "./rules.types";
import { evaluateRule } from "./rule.evaluator";

export const useRulesEngine = (
  rules: Rule[],
  data: Record<string, any>
) => {
  const results: RuleResult[] = rules.map((rule) =>
    evaluateRule(rule, data)
  );

  const triggered = results.filter((r) => r.triggered);

  return {
    results,
    triggered,
    hasTriggers: triggered.length > 0
  };
};

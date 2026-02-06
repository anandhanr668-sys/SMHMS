// src/lcnc/rules-engine/rules.types.ts

export type RuleOperator =
  | "EQUALS"
  | "NOT_EQUALS"
  | "GREATER_THAN"
  | "LESS_THAN"
  | "INCLUDES";

export interface RuleCondition {
  field: string;
  operator: RuleOperator;
  value: any;
}

export interface Rule {
  id: string;
  name: string;
  condition: RuleCondition;
  outcome: string;
}

export interface RuleResult {
  ruleId: string;
  triggered: boolean;
  outcome?: string;
}

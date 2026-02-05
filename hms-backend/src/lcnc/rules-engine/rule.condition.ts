// src/lcnc/rules-engine/rule.condition.ts

export type ConditionOperator =
  | "EQUALS"
  | "NOT_EQUALS"
  | "GREATER_THAN"
  | "LESS_THAN"
  | "IN";

export interface RuleCondition {
  field: string;
  operator: ConditionOperator;
  value: unknown;
}

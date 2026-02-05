// src/lcnc/rules-engine/rule.action.ts

export type RuleActionType =
  | "SET_VALUE"
  | "RAISE_ALERT"
  | "ASSIGN_ROLE"
  | "TRIGGER_WORKFLOW";

export interface RuleAction {
  type: RuleActionType;
  payload: Record<string, unknown>;
}

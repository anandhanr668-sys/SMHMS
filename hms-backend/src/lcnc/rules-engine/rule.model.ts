// src/lcnc/rules-engine/rule.model.ts

import { UUID } from "@shared/types/common.types.js";
import { RuleAction } from "./rule.action";
import { RuleCondition } from "./rule.condition";

export type RuleStatus = "ACTIVE" | "INACTIVE";

export interface Rule {
  id: UUID;
  tenantId: UUID;
  name: string;
  description?: string;
  version: string;
  status: RuleStatus;
  conditions: RuleCondition[];
  actions: RuleAction[];
  createdAt: string;
}

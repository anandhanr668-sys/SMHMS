// src/core/policies/report.policy.ts

import { Role } from "../rbac/role.model.js";
import { UUID } from "@shared/types/common.types.js";

export interface ReportPolicyContext {
  userRole: Role;
  userId: UUID;
  patientId: UUID;
  authorDoctorId: UUID;
}

/**
 * Can user view a report?
 */
export const canViewReport = (
  context: ReportPolicyContext
): boolean => {
  const { userRole, userId, authorDoctorId } = context;

  if (userRole === "ADMIN") return true;
  if (userRole === "DOCTOR" && authorDoctorId === userId) return true;
  if (userRole === "NURSE") return true;
  if (userRole === "PATIENT") return true;

  return false;
};

/**
 * Can user generate a report?
 */
export const canGenerateReport = (
  context: ReportPolicyContext
): boolean => {
  const { userRole, userId, authorDoctorId } = context;

  if (userRole === "ADMIN") return true;
  if (userRole === "DOCTOR" && authorDoctorId === userId) return true;

  return false;
};

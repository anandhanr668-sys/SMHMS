// src/core/policies/patient.policy.ts

import { Role } from "../rbac/role.model.js";
import { UUID } from "@shared/types/common.types.js";

export interface PatientPolicyContext {
  userRole: Role;
  userId: UUID;
  patientId: UUID;
  assignedDoctorId?: UUID;
}

/**
 * Can the user view patient details?
 */
export const canViewPatient = (
  context: PatientPolicyContext
): boolean => {
  const { userRole, userId, assignedDoctorId } = context;

  if (userRole === "ADMIN") return true;
  if (userRole === "DOCTOR" && assignedDoctorId === userId) return true;
  if (userRole === "NURSE") return true;

  // Patient can view self (handled at controller with auth context)
  if (userRole === "PATIENT") return true;

  return false;
};

/**
 * Can the user update patient details?
 */
export const canUpdatePatient = (
  context: PatientPolicyContext
): boolean => {
  const { userRole, userId, assignedDoctorId } = context;

  if (userRole === "ADMIN") return true;
  if (userRole === "DOCTOR" && assignedDoctorId === userId) return true;

  return false;
};

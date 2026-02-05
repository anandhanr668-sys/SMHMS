// src/core/versioning/version.model.ts

/**
 * Semantic version string (e.g. "v1", "v2")
 */
export type VersionTag = string;

/**
 * Versioned entity types supported by the system
 */
export type VersionedEntity =
  | "API"
  | "FORM"
  | "REPORT_TEMPLATE"
  | "WORKFLOW";

/**
 * Version metadata
 */
export interface Version {
  entity: VersionedEntity;
  version: VersionTag;
  isActive: boolean;
  createdAt: string;
}

/**
 * Context passed around services/controllers
 */
export interface VersionContext {
  entity: VersionedEntity;
  version: VersionTag;
}

// src/core/versioning/version.service.ts

import { Version, VersionContext, VersionedEntity } from "./version.model.js";

/**
 * In-memory version registry (safe default)
 * Later replaced by DB-backed registry
 */
const VERSION_REGISTRY: Version[] = [
  {
    entity: "API",
    version: "v1",
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    entity: "FORM",
    version: "v1",
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    entity: "REPORT_TEMPLATE",
    version: "v1",
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    entity: "WORKFLOW",
    version: "v1",
    isActive: true,
    createdAt: new Date().toISOString()
  }
];

/**
 * Get active version for a given entity
 */
export const getActiveVersion = (
  entity: VersionedEntity
): VersionContext => {
  const version = VERSION_REGISTRY.find(
    (v) => v.entity === entity && v.isActive
  );

  if (!version) {
    throw new Error(`No active version found for entity: ${entity}`);
  }

  return {
    entity: version.entity,
    version: version.version
  };
};

/**
 * Validate if a requested version is supported
 */
export const isVersionSupported = (
  entity: VersionedEntity,
  versionTag: string
): boolean => {
  return VERSION_REGISTRY.some(
    (v) => v.entity === entity && v.version === versionTag
  );
};

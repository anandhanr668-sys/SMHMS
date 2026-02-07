// src/migrations/009_create_workflows_tables.ts

import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  // Workflows
  await knex.schema.createTable("lcnc_workflows", (table) => {
    table.uuid("id").primary();
    table.uuid("tenant_id").notNullable().references("id").inTable("tenants");
    table.string("name").notNullable();
    table.string("version").notNullable();
    table.string("status").notNullable().defaultTo("ACTIVE");
    table.string("initial_state");
    table.jsonb("states").notNullable();
    table.jsonb("transitions").notNullable();
    table.timestamps(true, true);
  });

  // Workflow transitions (audit of defined transitions) - optional index
  await knex.schema.createTable("lcnc_workflow_transitions", (table) => {
    table.uuid("id").primary();
    table.uuid("workflow_id").notNullable().references("id").inTable("lcnc_workflows");
    table.uuid("tenant_id").notNullable().references("id").inTable("tenants");
    table.string("from_state").notNullable();
    table.string("to_state").notNullable();
    table.jsonb("meta");
    table.timestamps(true, true);
  });

  // Workflow instances
  await knex.schema.createTable("lcnc_workflow_instances", (table) => {
    table.uuid("id").primary();
    table.uuid("workflow_id").notNullable().references("id").inTable("lcnc_workflows");
    table.uuid("tenant_id").notNullable().references("id").inTable("tenants");
    table.string("current_state").notNullable();
    table.jsonb("data");
    table.timestamps(true, true);
  });

  // Audit logs for workflow operations
  await knex.schema.createTable("lcnc_workflow_audit_logs", (table) => {
    table.uuid("id").primary();
    table.uuid("tenant_id").notNullable().references("id").inTable("tenants");
    table.uuid("workflow_id");
    table.uuid("instance_id");
    table.string("action").notNullable();
    table.jsonb("details");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("lcnc_workflow_audit_logs");
  await knex.schema.dropTableIfExists("lcnc_workflow_instances");
  await knex.schema.dropTableIfExists("lcnc_workflow_transitions");
  await knex.schema.dropTableIfExists("lcnc_workflows");
}

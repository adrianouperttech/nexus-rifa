-- This script adds the missing foreign key relationships to your database.
-- It also corrects data types in the 'assinaturas' table to allow for relationships.

-- Add foreign key constraints to the audit_logs table
ALTER TABLE audit_logs
ADD CONSTRAINT fk_audit_logs_tenant FOREIGN KEY (tenant_id) REFERENCES tenants(id),
ADD CONSTRAINT fk_audit_logs_user FOREIGN KEY (user_id) REFERENCES users(id);

-- Correct data types in the assinaturas table
-- This will attempt to cast the existing text values to UUID. This will fail if the values are not valid UUIDs.
ALTER TABLE assinaturas
    ALTER COLUMN tenant_id TYPE UUID USING tenant_id::uuid,
    ALTER COLUMN plan_id TYPE UUID USING plan_id::uuid,
    ALTER COLUMN id TYPE UUID USING id::uuid;

-- Add foreign key constraints to the assinaturas table
ALTER TABLE assinaturas
ADD CONSTRAINT fk_assinaturas_tenant FOREIGN KEY (tenant_id) REFERENCES tenants(id),
ADD CONSTRAINT fk_assinaturas_plan FOREIGN KEY (plan_id) REFERENCES plans(id);

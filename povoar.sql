
-- Create the tenants table
CREATE TABLE tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    email TEXT,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    nome TEXT,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'admin',
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(tenant_id, email)
);

-- Create the rifas table
CREATE TABLE rifas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id),
    titulo TEXT NOT NULL,
    descricao TEXT,
    valor_cota NUMERIC NOT NULL,
    min_num INTEGER DEFAULT 1,
    max_num INTEGER NOT NULL,
    chave_pix TEXT,
    status TEXT DEFAULT 'ativa',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "limit" INTEGER NOT NULL,
    nome TEXT NOT NULL
);

-- Create the cotas table
CREATE TABLE cotas (
    id INTEGER NOT NULL,
    rifa_id UUID REFERENCES rifas(id),
    tenant_id UUID REFERENCES tenants(id),
    status TEXT DEFAULT 'livre',
    nome TEXT,
    whatsapp TEXT,
    email TEXT,
    reservado_em TIMESTAMP,
    pago_em TIMESTAMP,
    PRIMARY KEY (id, rifa_id)
);

-- Create the reservas table
CREATE TABLE reservas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id),
    rifa_id UUID REFERENCES rifas(id),
    numero INTEGER NOT NULL,
    nome TEXT,
    whatsapp TEXT,
    email TEXT,
    status TEXT DEFAULT 'reservada',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the premios table
CREATE TABLE premios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rifa_id UUID REFERENCES rifas(id),
    descricao TEXT NOT NULL,
    ordem INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the pagamentos table
CREATE TABLE pagamentos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reserva_id UUID REFERENCES reservas(id),
    status TEXT NOT NULL,
    gateway_pagamento TEXT,
    transacao_id TEXT
);

-- Create the audit_logs table
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID,
    user_id UUID,
    acao TEXT NOT NULL,
    tabela TEXT NOT NULL,
    dados JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the assinaturas table
CREATE TABLE assinaturas (
    id TEXT PRIMARY KEY,
    plan_id TEXT NOT NULL,
    payer_email TEXT NOT NULL,
    status TEXT NOT NULL,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    next_payment_date TIMESTAMP NOT NULL,
    tenant_id TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the plano_assinatura table
CREATE TABLE plano_assinatura (
    id TEXT PRIMARY KEY,
    reason TEXT NOT NULL,
    status TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the plans table
CREATE TABLE plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    price NUMERIC NOT NULL,
    "limit" INTEGER NOT NULL,
    mercadopago_plan_id TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the root_users table
CREATE TABLE root_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

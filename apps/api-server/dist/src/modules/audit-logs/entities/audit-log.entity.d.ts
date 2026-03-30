export declare class AuditLog {
    id: string;
    tenant_id: string;
    user_id: string;
    acao: string;
    tabela: string;
    dados: any;
    created_at: Date;
}

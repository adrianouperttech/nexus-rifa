import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('audit_logs')
export class AuditLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: true })
  tenant_id: string;

  @Column({ type: 'uuid', nullable: true })
  user_id: string;

  @Column({ type: 'text' })
  acao: string;

  @Column({ type: 'text' })
  tabela: string;

  @Column({ type: 'jsonb', nullable: true })
  dados: any;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}

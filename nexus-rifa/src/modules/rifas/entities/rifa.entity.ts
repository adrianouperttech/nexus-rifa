import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Tenant } from '../../tenants/entities/tenant.entity';
import { Cota } from '../../cotas/entities/cota.entity';
import { Reserva } from '../../reservas/entities/reserva.entity';
import { Pagamento } from '../../pagamentos/entities/pagamento.entity';
import { Premio } from '../../premios/entities/premio.entity';

@Entity('rifas')
export class Rifa {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  tenant_id: string;

  @Column({ type: 'text' })
  titulo: string;

  @Column({ type: 'text', nullable: true })
  descricao: string;

  @Column({ type: 'numeric' })
  valor_cota: number;

  @Column({ type: 'integer', default: 1 })
  min_num: number;

  @Column({ type: 'integer' })
  max_num: number;

  @Column({ type: 'text', nullable: true })
  chave_pix: string;

  @Column({ type: 'text', default: 'ativa' })
  status: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ManyToOne(() => Tenant, (tenant) => tenant.rifas)
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;

  @OneToMany(() => Cota, (cota) => cota.rifa)
  cotas: Cota[];

  @OneToMany(() => Reserva, (reserva) => reserva.rifa)
  reservas: Reserva[];

  @OneToMany(() => Pagamento, (pagamento) => pagamento.rifa)
  pagamentos: Pagamento[];

  @OneToMany(() => Premio, (premio) => premio.rifa)
  premios: Premio[];
}

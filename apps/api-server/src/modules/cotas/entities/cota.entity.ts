import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Rifa } from '../../rifas/entities/rifa.entity';
import { Tenant } from '../../tenants/entities/tenant.entity';
@Entity('cotas')
export class Cota {
  @PrimaryColumn({ type: 'integer' })
  id: number;
  @PrimaryColumn({ type: 'uuid' })
  rifa_id: string;
  @Column({ type: 'uuid' })
  tenant_id: string;
  @Column({ type: 'text', default: 'livre' })
  status: string;
  @Column({ type: 'text', nullable: true })
  nome: string;
  @Column({ type: 'text', nullable: true })
  whatsapp: string;
  @Column({ type: 'text', nullable: true })
  email: string;
  @Column({ type: 'timestamp', nullable: true })
  reservado_em: Date;
  @Column({ type: 'timestamp', nullable: true })
  pago_em: Date;
  @ManyToOne('Rifa', (rifa: Rifa) => rifa.cotas)
  @JoinColumn({ name: 'rifa_id' })
  rifa: Rifa;
  @ManyToOne(() => Tenant, (tenant) => tenant.cotas)
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Tenant } from '../../tenants/entities/tenant.entity';
import { Rifa } from '../../rifas/entities/rifa.entity';

@Entity('reservas')
export class Reserva {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  tenant_id: string;

  @Column({ type: 'uuid' })
  rifa_id: string;

  @Column({ type: 'integer' })
  numero: number;

  @Column({ type: 'text', nullable: true })
  nome: string;

  @Column({ type: 'text', nullable: true })
  whatsapp: string;

  @Column({ type: 'text', nullable: true })
  email: string;

  @Column({ type: 'text', default: 'reservada' })
  status: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ManyToOne(() => Tenant)
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;

  @ManyToOne(() => Rifa, (rifa) => rifa.reservas)
  @JoinColumn({ name: 'rifa_id' })
  rifa: Rifa;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Rifa } from '../../rifas/entities/rifa.entity';
import { Cota } from '../../cotas/entities/cota.entity';
import { Reserva } from '../../reservas/entities/reserva.entity';
import { Subscription } from '../../billing/entities/subscription.entity';
import { Plan } from '../../plans/entities/plan.entity';

@Entity('tenants')
export class Tenant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  nome: string;

  @Column({ type: 'text', nullable: true })
  email: string;

  @Column({ type: 'boolean', default: true })
  ativo: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ManyToOne(() => Plan, (plan) => plan.tenants)
  @JoinColumn({ name: 'plan_id' })
  plan: Plan;

  @OneToMany(() => User, (user) => user.tenant)
  users: User[];

  @OneToMany(() => Rifa, (rifa) => rifa.tenant)
  rifas: Rifa[];

  @OneToMany(() => Cota, (cota) => cota.tenant)
  cotas: Cota[];

  @OneToMany(() => Reserva, (reserva) => reserva.tenant)
  reservas: Reserva[];

  @OneToMany(() => Subscription, (subscription) => subscription.tenant)
  subscriptions: Subscription[];
}

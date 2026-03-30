import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Reserva } from '../../reservas/entities/reserva.entity';

@Entity()
export class Pagamento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  reserva_id: string;

  @ManyToOne(() => Reserva)
  @JoinColumn({ name: 'reserva_id' })
  reserva: Reserva;

  @Column()
  status: string;

  @Column({ nullable: true })
  gateway_pagamento: string;

  @Column({ nullable: true })
  transacao_id: string;
}

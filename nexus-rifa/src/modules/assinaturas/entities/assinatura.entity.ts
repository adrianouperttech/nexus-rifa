import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Assinatura {
  @PrimaryColumn()
  id: string;

  @Column()
  plan_id: string;

  @Column()
  payer_email: string;

  @Column()
  status: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  next_payment_date: Date;

  @Column()
  tenant_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

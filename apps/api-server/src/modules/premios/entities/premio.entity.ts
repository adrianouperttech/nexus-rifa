import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Rifa } from '../../rifas/entities/rifa.entity';

@Entity('premios')
export class Premio {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  rifa_id: string;

  @Column({ type: 'text' })
  descricao: string;

  @Column({ type: 'integer' })
  ordem: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ManyToOne(() => Rifa, (rifa) => rifa.premios)
  @JoinColumn({ name: 'rifa_id' })
  rifa: Rifa;
}

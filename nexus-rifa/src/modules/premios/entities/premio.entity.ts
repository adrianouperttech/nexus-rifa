import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Rifa } from '../../rifas/entities/rifa.entity';

@Entity('premios')
export class Premio {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  position: number;

  @ManyToOne(() => Rifa, (rifa) => rifa.premios)
  rifa: Rifa;
}

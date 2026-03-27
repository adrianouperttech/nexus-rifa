import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Rifa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  totalNumbers: number;

  @Column({ type: 'jsonb', nullable: true })
  availableNumbers: number[];
}

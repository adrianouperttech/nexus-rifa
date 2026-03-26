import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('plans')
export class Plan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'numeric' })
  price: number;

  @Column({ type: 'integer' })
  limit: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}

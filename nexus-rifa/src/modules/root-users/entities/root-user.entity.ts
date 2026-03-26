import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('root_users')
export class RootUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}

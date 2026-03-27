import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  passwordHash: string;

  @Column({ type: 'jsonb', nullable: true })
  roles: string[];

  @Column({ nullable: true })
  refreshToken: string;
}

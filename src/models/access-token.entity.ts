import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('access_tokens') // Table name in MySQL
export class AccessToken {
  @PrimaryGeneratedColumn('uuid')
  id: string; // UUID for unique token ID

  @ManyToOne(() => User, (user) => user.accessTokens, { onDelete: 'CASCADE' })
  user: User;

  @Column({ type: 'text', nullable: false })
  access_token: string;

  @Column({ type: 'timestamp', nullable: false })
  access_expire_at: Date;

  @Column({ type: 'varchar', length: 255, nullable: false })
  scope: string;

  @CreateDateColumn()
  createdAt: Date;
}

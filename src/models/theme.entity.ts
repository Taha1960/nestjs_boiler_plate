import { Column, CreateDateColumn, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Client } from "./client.entity";

export class Theme {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @OneToOne(() => Client)
  @JoinColumn()
  client: Client;
  @Column()
  primary_text_color: string;
  @Column()
  secondary_text_color: string;
  @Column({ type: 'varchar' })
  primary_color: string;
  @Column({ type: 'varchar' })
  secondary_color: string;
  @Column({ type: 'text' })
  primary_logo: string;
  @Column({ type: 'text' })
  secondary_logo: string;
  @Column({ type: 'text' })
  favicon_url: string;
  @Column({ default: false })
  isGrowthHacker: boolean;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
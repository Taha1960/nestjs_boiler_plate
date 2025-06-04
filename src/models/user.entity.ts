import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert, BeforeUpdate } from 'typeorm';
import { AccessToken } from './access-token.entity';
import * as bcrypt from 'bcryptjs';


export enum UserRole {
  ADMIN = '1',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({
    type: 'enum', 
    enum: UserRole, 
  })
  role: UserRole; 

  @Column()
  password: string;

  @OneToMany(() => AccessToken, (token) => token.user)
  accessTokens: AccessToken[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}

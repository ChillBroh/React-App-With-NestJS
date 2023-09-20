import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from './users.entity';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class Password {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column()
  passwords: string;

  @CreateDateColumn() d;
  timestamp: Date;

  @ManyToOne(() => User, (user) => user.password)
  @JoinColumn()
  user: User;
}

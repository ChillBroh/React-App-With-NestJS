import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
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

  @ManyToOne(() => User, (user) => user.password)
  @JoinColumn()
  user: User;
}

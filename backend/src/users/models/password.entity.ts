import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  RelationId,
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

  @CreateDateColumn()
  timestamp: Date;

  @ManyToOne(() => User, (user) => user.password)
  @JoinColumn()
  user: User;

  @RelationId((password: Password) => password.user)
  @Column()
  userId: number;
}

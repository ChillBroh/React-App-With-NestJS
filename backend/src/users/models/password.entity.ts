import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './users.entity';

@Entity()
export class Password {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  passwords: string;

  @ManyToOne(() => User, (user) => user.password)
  user: User;
}

import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Password } from './password.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  userName: string;

  @Column()
  email: string;

  @OneToMany(() => Password, (password) => password.user)
  password: Password[];
}

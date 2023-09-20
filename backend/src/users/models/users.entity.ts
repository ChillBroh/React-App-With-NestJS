import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
} from 'typeorm';
// import { Password } from './password.entity';
import { IsNotEmpty, IsString, IsPhoneNumber, IsEmail } from 'class-validator';
import { Password } from './password.entity';
// import { Password } from './password.entity';

@Entity()
@Unique(['email', 'userName'])
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  userName: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
  mobile: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  // @OneToMany(() => Password, (password) => password.user)
  // password: Password[];
  @Column()
  @IsNotEmpty()
  @IsString()
  password: string;
}

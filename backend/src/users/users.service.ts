import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { User } from './models/users.entity';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Password } from './models/password.entity';
import { AuthGuard } from 'src/auth/guards/jwt.guard';
import { json } from 'node:stream/consumers';

@Injectable()
export class UsersService {
  constructor(private readonly dataSource: DataSource) {}

  //hashing password
  async hashedPassword(password: string): Promise<string> {
    const saltOrRounds = 10;

    const salt = await bcrypt.genSalt(saltOrRounds);

    const hash = await bcrypt.hash(password, salt);

    return hash;
  }

  //create a user
  async createUser(user: User): Promise<string> {
    try {
      const pass: any = user.password;
      const hash = await this.hashedPassword(pass);

      const newUser = await this.dataSource.getRepository(User).create({
        userName: user.userName,
        email: user.email,
        mobile: user.mobile,
        firstName: user.firstName,
        lastName: user.lastName,
      });

      const response = await this.dataSource.getRepository(User).save(newUser);

      //savve hashed passwrd to db password table
      const newPassword = await this.dataSource.getRepository(Password).create({
        passwords: hash,
        user: response,
      });
      await this.dataSource.getRepository(Password).save(newPassword);

      return 'user Sucessfully created';
    } catch (err) {
      if (err.code === '23505') {
        throw new ForbiddenException('Email is already in use.');
      }
      throw new BadRequestException('Failed to create user.');
    }
  }

  @UseGuards(AuthGuard)
  //get user list
  async getAllUsers(): Promise<User[] | undefined> {
    try {
      const response = await this.dataSource.getRepository(User).find();
      if (!response) {
        throw new NotFoundException('No Users Found!');
      }
      return response;
    } catch (err) {
      throw new Error('Database Error: Unable to get users!');
    }
  }

  //get only one user
  async getOneUser(id: number): Promise<User | undefined> {
    try {
      const response = await this.dataSource
        .getRepository(User)
        .findOneById(id);
      if (!response) {
        throw new Error();
      }
      return response;
    } catch (err) {
      throw new NotFoundException('User Not found!');
    }
  }

  //update user

  async updateUser(user: User, id: number): Promise<any> {
    try {
      console.log(user);
      const response = await this.dataSource
        .getRepository(User)
        .update(id, user);
      console.log(typeof id, id);
      console.log(response);
      if (response.affected === 0) {
        throw new Error();
      }

      return response;
    } catch (err) {
      throw new BadRequestException('User Not Updated');
    }
  }

  //delete user
  async deleteUser(id: number): Promise<string> {
    try {
      const user = this.getOneUser(id);
      if (!user) {
        throw new Error();
      }

      const responseUser = await this.dataSource.getRepository(User).delete(id);

      if (responseUser.affected === 0) {
        throw new Error();
      }
      return 'User Deleted';
    } catch (err) {
      throw new BadRequestException('Failed to delete user');
    }
  }

  //find user by email
  async findOneByEmail(email: string): Promise<User> {
    const user = await this.dataSource.getRepository(User).findOneBy({ email });
    if (user === null) {
      throw new NotFoundException();
    }

    return user;
  }

  //get passwords by using email
  async getPassByEmail(email: string): Promise<Password | undefined> {
    const user = await this.findOneByEmail(email);

    if (user) {
      const password = await this.dataSource.getRepository(Password).find({
        where: { user: user },
        order: { timestamp: 'DESC' },
      });

      const latestPassword = password[0];
      return latestPassword;
    }

    return undefined;
  }
  //reset user password
  async passwordRest(email: string, password: string): Promise<Password> {
    try {
      const user = await this.dataSource
        .getRepository(User)
        .findOneBy({ email });
      const hash = await this.hashedPassword(password);

      const passwords = await this.dataSource
        .getRepository(password)
        .findBy({ userId: user.id });
      console.log(passwords);

      const savedPassword = await this.dataSource
        .getRepository(Password)
        .create({
          passwords: hash,
          user: user,
        });

      const response = await this.dataSource
        .getRepository(Password)
        .save(savedPassword);

      if (!response) {
        throw new ForbiddenException('Failed to reset password.');
      }
      return savedPassword;
    } catch (err) {
      throw new ForbiddenException('Failed to reset password.');
    }
  }
}

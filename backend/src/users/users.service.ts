import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { User } from './models/users.entity';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly dataSource: DataSource) {}

  async hashedPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    const salt = await bcrypt.genSalt(saltOrRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  // async createUser(user: User): Promise<User> {
  //   try {
  //     const hash = await this.hashedPassword(user.password);

  //     const newUser = this.dataSource.getRepository(User).create({
  //       ...user,
  //       password: hash,
  //     });

  //     const response = await this.dataSource.getRepository(User).save(newUser);
  //     return response;
  //   } catch (err) {
  //     if (err.code === '23505') {
  //       throw new ForbiddenException('Email is already in use.');
  //     }
  //     throw err;
  //   }
  // }

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

  async updateUser(user: User, id: number): Promise<any> {
    try {
      // const user = this.getOneUser(id);

      const response = await this.dataSource
        .getRepository(User)
        .update(id, user);

      if (response.affected === 0) {
        throw new Error();
      }

      return response;
    } catch (err) {
      throw new BadRequestException('User Not Updated');
    }
  }

  async deleteUser(id: number): Promise<string> {
    try {
      const user = this.getOneUser(id);
      if (!user) {
        throw new Error();
      }

      const response = await this.dataSource.getRepository(User).delete(id);

      if (response.affected === 0) {
        throw new Error();
      }
      return 'User Deleted';
    } catch (err) {
      throw new BadRequestException('Failed to delete user');
    }
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const response = this.dataSource.getRepository(User).findOneBy({ email });
    return response;
  }
}

import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './models/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async hashedPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    const salt = await bcrypt.genSalt(saltOrRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async createUser(user: User): Promise<User> {
    try {
      const hash = await this.hashedPassword(user.password);

      const newUser = this.userRepository.create({
        ...user,
        password: hash,
      });

      const response = await this.userRepository.save(newUser);
      return response;
    } catch (err) {
      if (err.code === '23505') {
        throw new ForbiddenException('Email is already in use.');
      }
      throw err;
    }
  }

  async getAllUsers(): Promise<User[] | undefined> {
    try {
      const response = await this.userRepository.find();
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
      const response = await this.userRepository.findOneById(id);
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

      const response = await this.userRepository.update(id, user);

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

      const response = await this.userRepository.delete(id);

      if (response.affected === 0) {
        throw new Error();
      }

      return 'User Deleted';
    } catch (err) {
      throw new BadRequestException('Failed to delete user');
    }
  }
}

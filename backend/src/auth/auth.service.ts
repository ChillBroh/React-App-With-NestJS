import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/models/users.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<any> {
    const passwordFound = await this.userService.getPassByEmail(email);
    if (!passwordFound) {
      return 'No User found';
    }

    const isMatch = await bcrypt.compare(password, passwordFound.passwords);
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = { sub: email, userName: password };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async findOne(email: string): Promise<User> {
    const response = await this.userService.findOneByEmail(email);
    return response;
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<any> {
    try {
      const userFound = await this.userService.getUserByEmail(email);
      const isMatch = await bcrypt.compare(password, userFound.password);
      if (!isMatch) {
        throw new Error();
      }

      const payload = { sub: userFound.email, userName: userFound.email };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}

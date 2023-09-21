import { Controller, Post, Body } from '@nestjs/common';
import { User } from 'src/users/models/users.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  signInUser(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<User> {
    const response = this.authService.signIn(email, password);
    return response;
  }

  @Post('reset/email-find')
  async getEmailUser(@Body('email') email: string) {
    const response = await this.authService.findOne(email);
    return response;
  }
}

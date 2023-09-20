import { Controller, Get, Body } from '@nestjs/common';
import { User } from 'src/users/models/users.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // @Get()
  // signInUser(
  //   @Body('email') email: string,
  //   @Body('password') password: string,
  // ): Promise<User> {
  //   const response = this.authService.signIn(email, password);
  //   return response;
  // }
}

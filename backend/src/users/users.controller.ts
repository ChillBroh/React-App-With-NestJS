import { Body, Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersModule } from './users.module';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get()
  getUser(@Body() user: UsersModule) {
    return this.userService.getUser(user);
  }
}

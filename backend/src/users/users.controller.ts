import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './models/users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('add-user')
  async createUser(@Body() user: User) {
    const response = await this.userService.createUser(user);
    return response;
  }
  @Get()
  async getAllUsers() {
    const response = await this.userService.getAllUsers();
    return response;
  }

  @Get(':id')
  async getOne(@Param() id: number) {
    const response = await this.userService.getOneUser(id);
    return response;
  }

  @Post('reset/email-find')
  async getEmailUser(@Body('email') email: string) {
    const response = await this.userService.findOneByEmail(email);
    return response;
  }

  @Patch(':id')
  async updateUser(@Body() user: User, @Param() id: number) {
    const response = await this.userService.updateUser(user, id);
    return response;
  }

  @Delete(':id')
  async DeleteUser(@Param() id: number) {
    const response = await this.userService.deleteUser(id);
    return response;
  }

  @Post('reset-user')
  async resetUser(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    console.log(email, password);
    const response = await this.userService.passwordRest(email, password);
    return response;
  }
}

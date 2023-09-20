import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
// import { ConfigModule } from '@nestjs/config';
import { jwtConstants } from './auth.constants';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    // ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
})
export class AuthModule {}

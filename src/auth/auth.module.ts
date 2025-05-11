import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { JwtStrategy } from './strategies/jwt.strategies';

@Module({
  controllers: [AuthController],
  providers: [AuthService,PrismaService, JwtService, ConfigService,UsersService, JwtStrategy],
})
export class AuthModule {}

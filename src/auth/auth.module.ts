import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService,PrismaService, JwtService, ConfigService,UsersService],
})
export class AuthModule {}

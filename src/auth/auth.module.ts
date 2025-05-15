import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { JwtStrategy } from './strategies/jwt.strategies';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports:[ PassportModule ],
  controllers: [AuthController],
  providers: [AuthService,PrismaService, JwtService, ConfigService, JwtStrategy],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { PartenaireService } from './Partenaire.service';
import { PartenaireController } from './Partenaire.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [PartenaireController],
  providers: [PartenaireService,PrismaService,AuthService, JwtService],
})
export class PartenaireModule {}

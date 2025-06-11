import { Module } from '@nestjs/common';
import { TypePartenaireService } from './type-partenaire.service';
import { TypePartenaireController } from './type-partenaire.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [TypePartenaireController],
  providers: [TypePartenaireService, PrismaService],
})
export class TypePartenaireModule {}

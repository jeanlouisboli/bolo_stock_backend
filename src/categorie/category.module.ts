import { Module } from '@nestjs/common';
import { CategorieService } from './category.service';
import { CategorieController } from './category.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CategorieController],
  providers: [CategorieService,PrismaService],
})
export class CategorieModule {}

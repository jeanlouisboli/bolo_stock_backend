import { Module } from '@nestjs/common';
import { TypePartenaireService } from './type-partenaire.service';
import { TypePartenaireController } from './type-partenaire.controller';

@Module({
  controllers: [TypePartenaireController],
  providers: [TypePartenaireService],
})
export class TypePartenaireModule {}

import { Injectable } from '@nestjs/common';
import { CreateTypePartenaireDto } from './dto/create-type-partenaire.dto';
import { UpdateTypePartenaireDto } from './dto/update-type-partenaire.dto';

@Injectable()
export class TypePartenaireService {
  create(createTypePartenaireDto: CreateTypePartenaireDto) {
    return 'This action adds a new typePartenaire';
  }

  findAll() {
    return `This action returns all typePartenaire`;
  }

  findOne(id: number) {
    return `This action returns a #${id} typePartenaire`;
  }

  update(id: number, updateTypePartenaireDto: UpdateTypePartenaireDto) {
    return `This action updates a #${id} typePartenaire`;
  }

  remove(id: number) {
    return `This action removes a #${id} typePartenaire`;
  }
}

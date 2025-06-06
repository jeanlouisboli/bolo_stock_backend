import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TypePartenaireService } from './type-partenaire.service';
import { CreateTypePartenaireDto } from './dto/create-type-partenaire.dto';
import { UpdateTypePartenaireDto } from './dto/update-type-partenaire.dto';

@Controller('type-partenaire')
export class TypePartenaireController {
  constructor(private readonly typePartenaireService: TypePartenaireService) {}

  @Post()
  create(@Body() createTypePartenaireDto: CreateTypePartenaireDto) {
    return this.typePartenaireService.create(createTypePartenaireDto);
  }

  @Get()
  findAll() {
    return this.typePartenaireService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typePartenaireService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTypePartenaireDto: UpdateTypePartenaireDto) {
    return this.typePartenaireService.update(+id, updateTypePartenaireDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typePartenaireService.remove(+id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  UseGuards,
  Put,
} from '@nestjs/common';
import { PartenaireService } from './partenaire.service';
import { CreatePartenaireDto } from './dto/create-partenaire.dto';
import { UpdatePartenaireDto } from './dto/update-partenaire.dto';
import { AddLocationPartenaireDto } from './dto/add-location-partenaire.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('partenaire')
@Controller('partenaire')
export class PartenaireController {
  constructor(private readonly PartenaireService: PartenaireService) { }

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau magasin' })
  @ApiResponse({ status: 201, description: "Un nouveau partenaire a ete ajoute" })
  @ApiBody({
    type: CreatePartenaireDto,
    description: 'Json structure for Partenaire object',
  })
  create(@Body() createPartenaireDto: CreatePartenaireDto) {
    return createPartenaireDto;
    // return this.PartenaireService.create(createPartenaireDto);
  }



  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put(':id/add-location')
  @ApiOperation({ summary: 'Ajouter une localisation à un magasin' })
  @ApiParam({ name: 'id', type: Number, description: 'ID du magasin' })
  @ApiBody({
    type: AddLocationPartenaireDto,
    description: 'Json structure for user object',
  })
  addLocationPartenaire(
    @Param('id', ParseIntPipe) id: string,
    @Body() addLocationPartenaireDto: AddLocationPartenaireDto,
  ) {
    return this.PartenaireService.addLocationPartenaire(id, addLocationPartenaireDto);
  }



  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lister tous les magasins (paginés)' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    const parsedPage = page ? Number(page) : undefined;
    const parsedLimit = limit ? Number(limit) : undefined;
    return this.PartenaireService.findAll(parsedPage, parsedLimit);
  }


  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Récupérer un magasin par son ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID du magasin' })
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.PartenaireService.findOne(id);
  }


  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mettre à jour un magasin' })
  @ApiParam({ name: 'id', type: String, description: 'ID du magasin' })
  @ApiBody({
    type: CreatePartenaireDto,
    description : 'Json structure for Partenaire object'
  })
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updatePartenaireDto: UpdatePartenaireDto,
  ) {
    return this.PartenaireService.update(id, updatePartenaireDto);
  }




  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Supprimer (soft delete) un magasin' })
  @ApiParam({ name: 'id', type: Number, description: 'ID du magasin' })
  @ApiResponse({status:201, description:"Parteniare supprimé"})
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.PartenaireService.softDeletePartenaire(id);
  }


}

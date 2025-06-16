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
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { AddLocationPartnerDto } from './dto/add-location-partner.dto';
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
  constructor(private readonly partenaireService: PartenaireService) { }

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau magasin' })
  @ApiResponse({ status: 201, description: "Un nouveau partenaire a ete ajoute" })
  @ApiBody({
    type: CreatePartnerDto,
    description: 'Json structure for Partenaire object',
  })
  create(@Body() createPartnerDto: CreatePartnerDto) {
   // return createPartnerDto;
    return this.partenaireService.create(createPartnerDto);
  }



  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put(':id/add-location')
  @ApiOperation({ summary: 'Ajouter une localisation à un magasin' })
  @ApiParam({ name: 'id', type: Number, description: 'ID du magasin' })
  @ApiBody({
    type: AddLocationPartnerDto,
    description: 'Json structure for user object',
  })
  addLocationPartenaire(
    @Param('id', ParseIntPipe) id: string,
    @Body() addLocationPartnerDto: AddLocationPartnerDto,
  ) {
    return this.partenaireService.addLocationPartner(id, addLocationPartnerDto);
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
    return this.partenaireService.findAll(parsedPage, parsedLimit);
  }


  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Récupérer un magasin par son ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID du magasin' })
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.partenaireService.findOne(id);
  }


  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mettre à jour un magasin' })
  @ApiParam({ name: 'id', type: String, description: 'ID du magasin' })
  @ApiBody({
    type: CreatePartnerDto,
    description : 'Json structure for Partenaire object'
  })
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updatePartnerDto: UpdatePartnerDto,
  ) {
    return this.partenaireService.update(id, updatePartnerDto);
  }




  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Supprimer (soft delete) un magasin' })
  @ApiParam({ name: 'id', type: Number, description: 'ID du magasin' })
  @ApiResponse({status:201, description:"Parteniare supprimé"})
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.partenaireService.softDeletePartner(id);
  }


}

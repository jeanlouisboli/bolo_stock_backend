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
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { AddLocationShopDto } from './dto/add-location-shop.dto';
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

@ApiTags('Shop')
@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) { }

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau magasin' })
  @ApiResponse({ status: 201, description: "Un nouveau partenaire a ete ajoute" })
  @ApiBody({
    type: CreateShopDto,
    description: 'Json structure for shop object',
  })
  create(@Body() createShopDto: CreateShopDto) {
    return this.shopService.create(createShopDto);
  }



  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post(':id/add-location')
  @ApiOperation({ summary: 'Ajouter une localisation à un magasin' })
  @ApiParam({ name: 'id', type: Number, description: 'ID du magasin' })
  @ApiBody({
    type: AddLocationShopDto,
    description: 'Json structure for user object',
  })
  addLocationShop(
    @Param('id', ParseIntPipe) id: number,
    @Body() addLocationShopDto: AddLocationShopDto,
  ) {
    return this.shopService.addLocationShop(id, addLocationShopDto);
  }



  @Get()
  @ApiOperation({ summary: 'Lister tous les magasins (paginés)' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    const parsedPage = page ? Number(page) : undefined;
    const parsedLimit = limit ? Number(limit) : undefined;
    return this.shopService.findAll(parsedPage, parsedLimit);
  }



  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un magasin par son ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID du magasin' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.shopService.findOne(id);
  }



  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour un magasin' })
  @ApiParam({ name: 'id', type: Number, description: 'ID du magasin' })
  @ApiBody({
    type: CreateShopDto,
    description : 'Json structure for shop object'
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateShopDto: UpdateShopDto,
  ) {
    return this.shopService.update(id, updateShopDto);
  }





  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer (soft delete) un magasin' })
  @ApiParam({ name: 'id', type: Number, description: 'ID du magasin' })
  @ApiResponse({status:201, description:"Parteniare supprimé"})
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.shopService.softDeleteShop(id);
  }


}

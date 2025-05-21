import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, ParseIntPipe, Req, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtUser } from 'src/auth/interface/jwt-user.interface';


@UseGuards(AuthGuard('jwt'))
@ApiTags('products')
@Controller('products')
export class ProductsController {

  
  constructor(private readonly productsService: ProductsService) {}

  

  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 401, description: 'Autorisation requise.'})
  @ApiBody({
    type: CreateProductDto,
    description: 'Json structure for product object',
 })
  @Post()
  create(@Body() createProductDto: CreateProductDto, @Req() req: Request ) {
    
    const user = req.user as JwtUser; // typage ici
    const partenaireId = user.partenaireId;


    return this.productsService.create(createProductDto,partenaireId);
  }


  @ApiBearerAuth()
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Numéro de page (optionnel)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Nombre d\'éléments par page (optionnel)' })
  @ApiResponse({ status: 200, description: 'Liste des produits avec partenaire' })
  @ApiResponse({ status: 401, description: 'Autorisation requise.'})
  @Get()
  findAll(@Req() req: Request,
     @Query('page') page?: number,
        @Query('limit') limit?: number, 
  ) {

    const parsedPage = page ? Number(page) : undefined;
    const parsedLimit = limit ? Number(limit) : undefined;
      
    const user = req.user as JwtUser; // typage ici
    const partenaireId = user.partenaireId;

   // return partenaireId;
    return this.productsService.findAll(partenaireId,parsedPage, parsedLimit);
  }



  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 401, description: 'Autorisation requise.'})
  @ApiParam({ name: 'id',required: true, type: Number, description: 'l\id du produit ' })
  @Get(':id')
  findOne(@Req() req: Request,@Param('id',ParseIntPipe) id: number) {

    const user = req.user as JwtUser; // typage ici
    const partenaireId = user.partenaireId;

    return this.productsService.findOne(partenaireId,id);
  }



  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'The record has been successfully updated.'})
  @ApiResponse({ status: 401, description: 'Autorisation requise.'})
  @ApiParam({ name: 'id',required: true, type: Number, description: 'l\id du produit ' })
  @ApiBody({
    type: CreateProductDto,
    description: 'Json structure for product object',
 })
  @Put(':id')
  update(@Param('id',ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto, @Req() req: Request) {

    const user = req.user as JwtUser; // typage ici
    const partenaireId = user.partenaireId;

    return this.productsService.update(id, updateProductDto,partenaireId);
  }


  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'The record has been successfully deleted.'})
  @ApiResponse({ status: 401, description: 'Autorisation requise.'})
  @ApiParam({ name: 'id',required: true, type: Number, description: 'l\id du produit ' })
  @Delete(':id')
  softDeletePartenaire(@Req() req: Request,@Param('id',ParseIntPipe) id: number) {
    
    const user = req.user as JwtUser; // typage ici
    const partenaireId = user.partenaireId;


    return this.productsService.softDeletePartenaire(partenaireId,id);
  }
}

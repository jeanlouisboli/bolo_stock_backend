import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';


@UseGuards(AuthGuard('jwt'))
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  

  @Post()
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Autorisation requise.'})
  @ApiBody({
    type: CreateProductDto,
    description: 'Json structure for product object',
 })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }




  @Get()
  findAll(
     @Query('page') page?: number,
        @Query('limit') limit?: number,
  ) {

    const parsedPage = page ? Number(page) : undefined;
    const parsedLimit = limit ? Number(limit) : undefined;

    return this.productsService.findAll(parsedPage, parsedLimit);
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  softDeletePartenaire(@Param('id',ParseIntPipe) id: number) {
    return this.productsService.softDeletePartenaire(id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, UseGuards, Put } from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { AddLocationShopDto } from './dto/add-location-shop.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('shop')
export class ShopController {

  constructor(private readonly shopService: ShopService) {}


  @Post()
  create(@Body() createShopDto: CreateShopDto) {
    
    console.log(createShopDto)
    return this.shopService.create(createShopDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post("/:id/add-location")
  addLocationShop(@Param('id',ParseIntPipe) id: number, @Body() addLocationShopDto: AddLocationShopDto ) {
    
    return this.shopService.addLocationShop(id,addLocationShopDto);
  }
  
  @Get()
  findAll(@Query('page') page?:number, @Query('limit') limit?:number) {

    const parsedPage = page ? Number(page) : undefined;
    const parsedLimit = limit ? Number(limit) : undefined;

    return this.shopService.findAll(parsedPage, parsedLimit);
  }


  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.shopService.findOne(id);
  }

  @Put(':id')
  update(@Param('id',ParseIntPipe) id: number, @Body() updateShopDto: UpdateShopDto) {
    return this.shopService.update(id, updateShopDto);
  }


  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.shopService.softDeleteShop(id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, ParseIntPipe, UseGuards, Put } from '@nestjs/common';

import { ApiBearerAuth, ApiBody, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtUser } from 'src/auth/interface/jwt-user.interface';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { PromotionService } from './promotion.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';

@ApiTags('promotion')
@UseGuards(AuthGuard('jwt'))
@Controller('promotion')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}


   @ApiBearerAuth()
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 401, description: 'Autorisation requise.'})
    @ApiBody({
      type: CreatePromotionDto,
      description: 'Json structure for order object',
   })
    @Post()
    create(@Body() CreatePromotionDto: CreatePromotionDto, @Req() req: Request ) {
      
      const user = req.user as JwtUser; // typage ici
      const partenaireId = user.partenaireId;
  
  
      return this.promotionService.create(CreatePromotionDto,partenaireId);
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
      return this.promotionService.findAll(partenaireId,parsedPage, parsedLimit);
    }
  
  
  
    @ApiBearerAuth()
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 401, description: 'Autorisation requise.'})
    @ApiParam({ name: 'id',required: true, type: Number, description: 'l\id du produit ' })
    @Get(':id')
    findOne(@Req() req: Request,@Param('id',ParseIntPipe) id: number) {
  
      const user = req.user as JwtUser; // typage ici
      const partenaireId = user.partenaireId;
  
      return this.promotionService.findOne(partenaireId,id);
    }
  
  
  
    @ApiBearerAuth()
    @ApiResponse({ status: 201, description: 'The record has been successfully updated.'})
    @ApiResponse({ status: 401, description: 'Autorisation requise.'})
    @ApiParam({ name: 'id',required: true, type: Number, description: 'l\id du produit ' })
    @ApiBody({
      type: CreatePromotionDto,
      description: 'Json structure for promotion object',
   })
    @Put(':id')
    update(@Param('id',ParseIntPipe) id: number, @Body() UpdateOrderDto: UpdatePromotionDto, @Req() req: Request) {
  
      const user = req.user as JwtUser; // typage ici
      const partenaireId = user.partenaireId;
  
      return this.promotionService.update(id, UpdateOrderDto,partenaireId);
    }
  
  
    @ApiBearerAuth()
    @ApiResponse({ status: 201, description: 'The record has been successfully deleted.'})
    @ApiResponse({ status: 401, description: 'Autorisation requise.'})
    @ApiParam({ name: 'id',required: true, type: Number, description: 'l\id du produit ' })
    @Delete(':id')
    softDeletePartenaire(@Req() req: Request,@Param('id',ParseIntPipe) id: number) {
      
      const user = req.user as JwtUser; // typage ici
      const partenaireId = user.partenaireId;
  
  
      return this.promotionService.softDeletePromotion(partenaireId,id);
    }
    
}

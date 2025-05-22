import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBearerAuth, ApiBody, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtUser } from 'src/auth/interface/jwt-user.interface';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';


@ApiTags('orders')
@UseGuards(AuthGuard('jwt'))
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

   @ApiBearerAuth()
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 401, description: 'Autorisation requise.'})
    @ApiBody({
      type: CreateOrderDto,
      description: 'Json structure for order object',
   })
    @Post()
    create(@Body() CreateOrderDto: CreateOrderDto, @Req() req: Request ) {
      
      const user = req.user as JwtUser; // typage ici
      const partenaireId = user.partenaireId;
  
  
      return this.ordersService.create(CreateOrderDto,partenaireId);
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
      return this.ordersService.findAll(partenaireId,parsedPage, parsedLimit);
    }
  
  
  
    @ApiBearerAuth()
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 401, description: 'Autorisation requise.'})
    @ApiParam({ name: 'id',required: true, type: Number, description: 'l\id du produit ' })
    @Get(':id')
    findOne(@Req() req: Request,@Param('id',ParseIntPipe) id: number) {
  
      // const user = req.user as JwtUser; // typage ici
      // const partenaireId = user.partenaireId;
  
      return this.ordersService.findOne(id);
    }
  
  
  
    @ApiBearerAuth()
    @ApiResponse({ status: 201, description: 'The record has been successfully updated.'})
    @ApiResponse({ status: 401, description: 'Autorisation requise.'})
    @ApiParam({ name: 'id',required: true, type: Number, description: 'l\id du produit ' })
    @ApiBody({
      type: CreateOrderDto,
      description: 'Json structure for product object',
   })
    @Patch(':id')
    update(@Param('id',ParseIntPipe) id: number, @Body() UpdateOrderDto: UpdateOrderDto, @Req() req: Request) {
  
      const user = req.user as JwtUser; // typage ici
      const partenaireId = user.partenaireId;
  
      return this.ordersService.update(id, UpdateOrderDto,partenaireId);
    }
  
  
    @ApiBearerAuth()
    @ApiResponse({ status: 201, description: 'The record has been successfully deleted.'})
    @ApiResponse({ status: 401, description: 'Autorisation requise.'})
    @ApiParam({ name: 'id',required: true, type: Number, description: 'l\id du produit ' })
    @Delete(':id')
    softDeletePartenaire(@Req() req: Request,@Param('id',ParseIntPipe) id: number) {
      
      const user = req.user as JwtUser; // typage ici
      const partenaireId = user.partenaireId;
  
  
      return this.ordersService.softDeleteOrders(partenaireId,id);
    }
    
}

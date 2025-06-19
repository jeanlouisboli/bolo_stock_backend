import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, Put, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CategorieService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBearerAuth, ApiBody, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtUser } from 'src/auth/interface/jwt-user.interface';
import { AuthGuard } from '@nestjs/passport';


@ApiBearerAuth()
@ApiTags('categorie')
@UseGuards(AuthGuard('jwt'))
@Controller('categorie')
export class CategorieController {


  constructor(private readonly categorieService: CategorieService) {}

    // @ApiBearerAuth()
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    // @ApiResponse({ status: 401, description: 'Autorisation requise.'})
    @ApiBody({
      type: CreateCategoryDto,
      description: 'Json structure for categorie object',
   })
    @Post()
    create(@Body() createCategoryDto: CreateCategoryDto, @Req() req: Request ) {
      
      // const user = req.user as JwtUser; // typage ici
      // const partenaireId = user.partenaireId;
      console.log('Requête reçue avec body:', createCategoryDto);
      return this.categorieService.create(createCategoryDto);
    }
  
  
    // @ApiBearerAuth()
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Numéro de page (optionnel)' })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Nombre d\'éléments par page (optionnel)' })
    @ApiResponse({ status: 200, description: 'Liste des categories' })
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
      return this.categorieService.findAll(parsedPage, parsedLimit);
    }
  
  
  
    // @ApiBearerAuth()
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 401, description: 'Autorisation requise.'})
    @ApiParam({ name: 'id',required: true, type: String, description: 'l\id du produit ' })
    @Get(':id')
    findOne(@Req() req: Request,@Param('id') id: string) {
  
      const user = req.user as JwtUser; // typage ici
      const partenaireId = user.partenaireId;
  
      return this.categorieService.findOne(id);
    }
  
  
  
    // @ApiBearerAuth()
    @ApiResponse({ status: 201, description: 'The record has been successfully updated.'})
    @ApiResponse({ status: 401, description: 'Autorisation requise.'})
    @ApiParam({ name: 'id',required: true, type: String, description: 'l\id du produit ' })
    @ApiBody({
      type: CreateCategoryDto,
      description: 'Json structure for product object',
   })
    @Put(':id')
    update(@Param('id') id: string, @Body() updateProductDto: UpdateCategoryDto, @Req() req: Request) {
  
      const user = req.user as JwtUser; // typage ici
      const partenaireId = user.partenaireId;
  
      return this.categorieService.update(id, updateProductDto);
    }
  
    // @ApiBearerAuth()
    @ApiResponse({ status: 201, description: 'The record has been successfully deleted.'})
    @ApiResponse({ status: 401, description: 'Autorisation requise.'})
    @ApiParam({ name: 'id',required: true, type: String, description: 'l\id du produit ' })
    @Delete(':id')
    softDeleteCategorie(@Req() req: Request,@Param('id') id: string) {
      
      const user = req.user as JwtUser; // typage ici
      const partenaireId = user.partenaireId;
  
      return this.categorieService.softDeleteCategorie(id);
    }


}

import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, Put, UseGuards } from '@nestjs/common';
import { TypePartenaireService } from './type-partenaire.service';
import { CreateTypePartenaireDto } from './dto/create-type-partenaire.dto';
import { UpdateTypePartenaireDto } from './dto/update-type-partenaire.dto';
import { ApiBearerAuth, ApiBody, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtUser } from 'src/auth/interface/jwt-user.interface';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@ApiTags('type-partenaire')
@UseGuards(AuthGuard('jwt'))
@Controller('type-partenaire')
export class TypePartenaireController {
  constructor(private readonly typePartenaireService: TypePartenaireService) {}

  // @ApiBearerAuth()
      @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
      // @ApiResponse({ status: 401, description: 'Autorisation requise.'})
      @ApiBody({
        type: CreateTypePartenaireDto,
        description: 'Json structure for type partenaire object',
     })
      @Post()
      create(@Body() createTypePartenaireDto: CreateTypePartenaireDto, @Req() req: Request ) {
        
        // const user = req.user as JwtUser; // typage ici
        // const partenaireId = user.partenaireId;
        console.log('Requête reçue avec body:', createTypePartenaireDto);
        return this.typePartenaireService.create(createTypePartenaireDto);
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
        return this.typePartenaireService.findAll(parsedPage, parsedLimit);
      }
    
    
    
      // @ApiBearerAuth()
      @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
      @ApiResponse({ status: 401, description: 'Autorisation requise.'})
      @ApiParam({ name: 'id',required: true, type: String, description: 'l\id du produit ' })
      @Get(':id')
      findOne(@Req() req: Request,@Param('id') id: string) {
    
        const user = req.user as JwtUser; // typage ici
        const partenaireId = user.partenaireId;
    
        return this.typePartenaireService.findOne(id);
      }
    
    
    
      // @ApiBearerAuth()
      @ApiResponse({ status: 201, description: 'The record has been successfully updated.'})
      @ApiResponse({ status: 401, description: 'Autorisation requise.'})
      @ApiParam({ name: 'id',required: true, type: String, description: 'l\id du produit ' })
      @ApiBody({
        type: CreateTypePartenaireDto,
        description: 'Json structure for type partenaire object',
     })
      @Put(':id')
      update(@Param('id') id: string, @Body() updateTypePartenaireDto: UpdateTypePartenaireDto, @Req() req: Request) {
    
        const user = req.user as JwtUser; // typage ici
        const partenaireId = user.partenaireId;
    
        return this.typePartenaireService.update(id, updateTypePartenaireDto);
      }
    
      // @ApiBearerAuth()
      @ApiResponse({ status: 201, description: 'The record has been successfully deleted.'})
      @ApiResponse({ status: 401, description: 'Autorisation requise.'})
      @ApiParam({ name: 'id',required: true, type: String, description: 'l\id du produit ' })
      @Delete(':id')
      softDeleteCategorie(@Req() req: Request,@Param('id') id: string) {
        
        const user = req.user as JwtUser; // typage ici
        const partenaireId = user.partenaireId;
    
        return this.typePartenaireService.softDeleteTypePartenaire(id);
      }
  


}

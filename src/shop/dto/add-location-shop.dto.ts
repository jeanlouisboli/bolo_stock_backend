import { ApiProperty } from '@nestjs/swagger';
import {
   
    IsNumber,
    IsLatitude,
    IsLongitude,
  } from 'class-validator';
  
  /**
   * DTO pour la création d'un commerce.
   * Tous les champs sauf latitude et longitude sont obligatoires.
   */
  export class AddLocationShopDto {
  


    /**
     * Longitude GPS du commerce (optionnelle)
     */
    @ApiProperty()
    @IsNumber({}, { message: 'La longitude doit être un nombre.' })
    @IsLongitude({ message: 'La longitude doit être valide.' })
    longitude: number;

    
    /**
     * Latitude GPS du commerce (optionnelle)
     */
    @ApiProperty()
    @IsNumber({}, { message: 'La latitude doit être un nombre.' })
    @IsLatitude({ message: 'La latitude doit être valide.' })
    latitude: number;
  
  
  }
  
import { ApiProperty } from '@nestjs/swagger';
import {
    IsString,
    IsOptional,
    IsEmail,
    IsNumber,
    IsLatitude,
    IsLongitude,
    MinLength,
  } from 'class-validator';
  
  /**
   * DTO pour la création d'un commerce.
   * Tous les champs sauf latitude et longitude sont obligatoires.
   */
  export class CreatePartenaireDto {
    /**
     * Nom du commerce (obligatoire)
     */
    @ApiProperty()
    @IsString({ message: 'Le nom du commerce est requis.' })
    name: string;
  
    /**
     * Type de commerce (ex: supermarché, boutique, etc.) (obligatoire)
     */
    @ApiProperty()
    @IsString({ message: 'Le type de commerce est requis.' })
    type_commerce: string;
  
    /**
     * Adresse physique du commerce (obligatoire)
     */
    @ApiProperty()
    @IsString({ message: "L'adresse est requise." })
    adresse: string;
  
    /**
     * Adresse email valide du commerce (obligatoire)
     */
    @ApiProperty()
    @IsEmail({}, { message: "Une adresse email valide est requise." })
    email: string;
  
    /**
     * Ville du commerce (obligatoire)
     */
    @ApiProperty()
    @IsString({ message: 'La ville est requise.' })
    ville: string;
  
    /**
     * Pays du commerce (obligatoire)
     */
    @ApiProperty()
    @IsString({ message: 'Le pays est requis.' })
    pays: string;
  
    /**
     * Latitude GPS du commerce (optionnelle)
     */
    @ApiProperty({
      required:false
    })
    @IsOptional()
    @IsNumber({}, { message: 'La latitude doit être un nombre.' })
    @IsLatitude({ message: 'La latitude doit être valide.' })
    latitude?: number;
  
    /**
     * Longitude GPS du commerce (optionnelle)
     */
    @ApiProperty({
      required:false
    })
    @IsOptional()
    @IsNumber({}, { message: 'La longitude doit être un nombre.' })
    @IsLongitude({ message: 'La longitude doit être valide.' })
    longitude?: number;
  
    /**
     * Nom d'utilisateur unique pour se connecter (obligatoire)
     */
    @ApiProperty()
    @IsOptional()
    @IsString({ message: "Le nom d'utilisateur est requis." })
    username: string;
  
    /**
     * Mot de passe (obligatoire, minimum 6 caractères recommandé)
     */
    
    @ApiProperty()
    @IsString({ message: 'Le mot de passe est requis.' })
    @MinLength(6, { message: 'Le mot de passe doit contenir au moins 6 caractères.' })
    password: string;
  }
  
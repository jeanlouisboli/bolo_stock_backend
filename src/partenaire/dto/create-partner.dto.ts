import { ApiProperty } from '@nestjs/swagger';
import { TypeUser } from '@prisma/client';
import {
    IsString,
    IsOptional,
    IsEmail,
    IsNumber,
    IsLatitude,
    IsLongitude,
    MinLength,
    Matches,
  } from 'class-validator';
  
  /**
   * DTO pour la création d'un commerce.
   * Tous les champs sauf latitude et longitude sont obligatoires.
   */
  export class CreatePartnerDto {
    /**
     * Nom du commerce (obligatoire)
     */
    @ApiProperty()
    @IsString({ message: 'Le nom du commerce est requis.' })
    namePartner: string;
  

      /**
     * Adresse physique du commerce (obligatoire)
     */
    @ApiProperty()
    @IsString({ message: "L'adresse est requise." })
    adress: string;

        /**
     * Ville du commerce (obligatoire)
     */
    @ApiProperty()
    @IsString({ message: 'La ville est requise.' })
    city: string;


       /**
     * Adresse email valide du commerce (obligatoire)
     */
    @ApiProperty()
    @IsEmail({}, { message: "Une adresse email valide est requise." })
    email: string;
 
    /**
     * Pays du commerce (obligatoire)
     */
    @ApiProperty()
    @IsString({ message: 'Le pays est requis.' })
    country: string;


    /**
     * Type de commerce (ex: supermarché, boutique, etc.) (obligatoire)
     */
    @ApiProperty()
    @IsString()
    @Matches(/^[a-fA-F0-9]{24}$/, {
        message: 'typePartenaireId doit être un ObjectId MongoDB valide (24 caractères hexadécimaux)',
      })
    typePartenaireId: string;
  
    /**
     * Nom d'utilisateur unique pour se connecter (obligatoire)
     */
    @ApiProperty()
    @IsOptional()
    @IsString({ message: "Le nom d'utilisateur est requis." })
    nameUser: string;
  

     /**
     * numero de telephone
     */
    @ApiProperty()
    @IsString()
    @Matches(/^[a-fA-F0-9]{10}$/, {
        message: 'phone doit être de 10 caractères)',
      })
    phone: string;


    /**
     * Mot de passe (obligatoire, minimum 6 caractères recommandé)
     */
    
    @ApiProperty()
    @IsString({ message: 'Le mot de passe est requis.' })
    @MinLength(6, { message: 'Le mot de passe doit contenir au moins 6 caractères.' })
    password: string;



    /**
     * Type de commerce (ex: supermarché, boutique, etc.) (obligatoire)
     */
    @ApiProperty()
    @IsString()
    @Matches(/^[a-fA-F0-9]{24}$/, {
        message: 'typeUser doit parmi la liste',
      })
    typeUser: TypeUser;

    
  }
  
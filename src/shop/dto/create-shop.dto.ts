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
  export class CreateShopDto {
    /**
     * Nom du commerce (obligatoire)
     */
    @IsString({ message: 'Le nom du commerce est requis.' })
    name: string;
  
    /**
     * Type de commerce (ex: supermarché, boutique, etc.) (obligatoire)
     */
    @IsString({ message: 'Le type de commerce est requis.' })
    type_commerce: string;
  
    /**
     * Adresse physique du commerce (obligatoire)
     */
    @IsString({ message: "L'adresse est requise." })
    adresse: string;
  
    /**
     * Adresse email valide du commerce (obligatoire)
     */
    @IsEmail({}, { message: "Une adresse email valide est requise." })
    email: string;
  
    /**
     * Ville du commerce (obligatoire)
     */
    @IsString({ message: 'La ville est requise.' })
    ville: string;
  
    /**
     * Pays du commerce (obligatoire)
     */
    @IsString({ message: 'Le pays est requis.' })
    pays: string;
  
    /**
     * Latitude GPS du commerce (optionnelle)
     */
    @IsOptional()
    @IsNumber({}, { message: 'La latitude doit être un nombre.' })
    @IsLatitude({ message: 'La latitude doit être valide.' })
    latitude?: number;
  
    /**
     * Longitude GPS du commerce (optionnelle)
     */
    @IsOptional()
    @IsNumber({}, { message: 'La longitude doit être un nombre.' })
    @IsLongitude({ message: 'La longitude doit être valide.' })
    longitude?: number;
  
    /**
     * Nom d'utilisateur unique pour se connecter (obligatoire)
     */
    @IsOptional()
    @IsString({ message: "Le nom d'utilisateur est requis." })
    username: string;
  
    /**
     * Mot de passe (obligatoire, minimum 6 caractères recommandé)
     */
  
    @IsString({ message: 'Le mot de passe est requis.' })
    @MinLength(6, { message: 'Le mot de passe doit contenir au moins 6 caractères.' })
    password: string;
  }
  
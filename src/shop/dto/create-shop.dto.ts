import { Type } from "class-transformer"
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { isFloat32Array } from "util/types"

export class CreateShopDto {


    @IsString({message:"Le nom de l'entreprise doit etre de chaine de caratere"})
    @IsNotEmpty({ message: 'Le nom est obligatoire' })
    name: string


    @IsString({message:"L'username de l'entreprise doit etre de chaine de caratere"})
    @IsNotEmpty({ message: "L'username est obligatoire" })
    username: string


    @IsString({message:"Le mot de passe de l'entreprise doit etre de chaine de caratere"})
    @IsNotEmpty({ message: 'Le mot de passe est obligatoire' })
    password: string


    @IsEmail({},{message:"Le format de l'email n'est pas respecter"})
    @IsNotEmpty({ message: "l'email est obligatoire" })
    email: string

    @IsString({message:"L'adresse de l'entreprise doit être de chaine de caratere"})
    @IsNotEmpty({ message: 'Le nom est obligatoire' })
    adresse: string

    @IsString({message:"La ville de l'entreprise doit etre de chaine de caratere"})
    @IsNotEmpty({ message: 'Le nom est obligatoire' })
    ville: string

    @IsString({message:"Le pays de l'entreprise doit etre de chaine de caratere"})
    @IsNotEmpty({ message: 'Le pays est obligatoire' })
    pays: string

    
    @Type(()=>Number)
    @IsNumber({}, { message: 'Latitude doit être un nombre' })
    @IsNotEmpty({ message: 'Le latitude est obligatoire' })
    latitude: number  

    @Type(()=>Number)
    @IsNumber({}, { message: 'La longitude doit être un nombre' })
    @IsNotEmpty({ message: 'La longitude est obligatoire' })
    longitude: number


   
}

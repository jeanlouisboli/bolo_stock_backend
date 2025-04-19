import { Role } from "@prisma/client";
import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";


export class CreateUserDto {

    @IsString({message:" Le nom doit être une chaine de caractère "})
    @IsNotEmpty({message:"Le nom doit être obligatoire"})
    username: string

    @IsEmail()
    @IsNotEmpty({message:"L'email doit être obligatoire"})
    email: string

    @IsEnum(Role)
    @IsNotEmpty({message:"Le rôle doit être obligatoire"})
    role : Role

}

import { Role } from "@prisma/client";
import { IsEmail, IsEnum, IsString } from "class-validator";


export class CreateUserDto {

    @IsString({},{mess})
    name: string

    @IsEmail()
    email: string

    @IsEnum(Role)
    role : Role

}

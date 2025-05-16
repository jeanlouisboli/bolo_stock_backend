import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"


export class LoginAuthDto {

    @ApiProperty()
    @IsString({message:"Le champs Username doit être une chaine de caratère"})
    username: string

    @ApiProperty()
    @IsString({message:"Le champs Username doit être une chaine de caratère"})
    password: string
}

import { IsString } from "class-validator"


export class CreateAuthDto {

    @IsString({message:"Le champs Username doit être une chaine de caratère"})
    username: string

    @IsString({message:"Le champs Username doit être une chaine de caratère"})
    password: string
}

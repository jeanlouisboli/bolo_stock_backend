import { IsString, MinLength } from 'class-validator';

export class SetPasswordDto {
  @IsString()
  token: string;

  @IsString({message:"Votre username doit être une chaine de caractère"})
  @MinLength(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' })
  username: string

  @IsString()
  @MinLength(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' })
  newPassword: string;
}

import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('login')
  async login(@Body() loginDto: LoginAuthDto) {
  const partenaire = await this.authService.validatPartenaire(loginDto.username, loginDto.password);

  if (!partenaire) {
    throw new UnauthorizedException('Identifiants invalides');
  }

  const token = await this.authService.generateTempToken(partenaire.id, partenaire.username,"1h"); // ou user payload

  return {
    message: 'Connexion réussie',
    token,
    partenaire
  };
}

}

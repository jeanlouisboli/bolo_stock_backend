import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private usersService: UsersService) {}


  @Post('login')
  async login(@Body() loginDto: LoginAuthDto) {
  const user = await this.authService.validateUser(loginDto.username, loginDto.password);

  if (!user) {
    throw new UnauthorizedException('Identifiants invalides');
  }

  const token = await this.authService.generateTempToken(user.id, user.username,"1h"); // ou user payload

  return {
    message: 'Connexion réussie',
    token,
  };
}

}

import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @ApiResponse({ status: 201, description: 'auth done !.'})
  @ApiBody({
      type: LoginAuthDto,
      description: 'Json structure for auth object',
   })
  @Post('login')
  async login(@Body() loginDto: LoginAuthDto) {
  const user = await this.authService.validatUser(loginDto.username, loginDto.password);

  if (!user) {
    throw new UnauthorizedException('Identifiants invalides');
  }

  const token = await this.authService.generateTempToken(user.id, user.email,"1h"); // ou user payload

  return {
    message: 'Connexion réussie',
    token,
    user
  };
}

}

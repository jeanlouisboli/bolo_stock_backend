import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UnauthorizedException, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SetPasswordDto } from './dto/set-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService, private authService: AuthService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {

    console.log(createUserDto)

    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }


  @Put('setPassword')
  async setPassword(
    @Body() data: SetPasswordDto ) {
 
    const { token,username, newPassword } = data;

    const payload = await this.authService.verifyToken(token);

  if (!payload) {
    throw new UnauthorizedException('Token invalide ou expiré');
  }

  await this.usersService.updatePassword(payload.userId,  username ,newPassword);

   return { message: 'Mot de passe mis à jour avec succès' };
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }


 

}

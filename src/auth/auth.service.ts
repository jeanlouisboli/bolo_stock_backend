import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CreateCartDto } from 'src/cart/dto/create-cart.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { Partenaire, User } from '@prisma/client';

@Injectable()
export class AuthService {


  constructor(private prismaService: PrismaService, private jwtService: JwtService, private  configService: ConfigService){}

  async validatPartenaire(username: string, password: string): Promise<Partenaire | null> {
    const Partenaire = await this.prismaService.Partenaire.findUnique({ where: { username } });
  
    if (!Partenaire || !(await bcrypt.compare(password, Partenaire.password))) {
      return null;
    }
  
    return Partenaire;
  }


  async generateTempToken(PartenaireId: number, name:string, expiresIn:string): Promise<string> {
    return this.jwtService.signAsync(
      { PartenaireId: PartenaireId , name: name},
      {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: expiresIn,
      },
    );
  }


  async verifyToken(token: string): Promise<any> {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET'),
      });
    } catch (err) {
      return null;
    }
  }
  


}

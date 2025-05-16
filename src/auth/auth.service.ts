import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CreateCartDto } from 'src/cart/dto/create-cart.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { Partenaire  } from '@prisma/client';

@Injectable()
export class AuthService {


  constructor(private prismaService: PrismaService, private jwtService: JwtService, private  configService: ConfigService){}

  async validatPartenaire(username: string, password: string): Promise<Partenaire | null> {
    const partenaire = await this.prismaService.partenaire.findUnique({ where: { username } });
  
    if (!partenaire || !(await bcrypt.compare(password, partenaire.password))) {
      return null;
    }
  
    return partenaire;
  }


  async generateTempToken(partenaireId: number, username:string, expiresIn:string): Promise<string> {
    return this.jwtService.signAsync(
      { partenaireId: partenaireId , username: username},
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

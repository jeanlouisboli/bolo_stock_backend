import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CreateCartDto } from 'src/cart/dto/create-cart.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { Shop, User } from '@prisma/client';

@Injectable()
export class AuthService {


  constructor(private prismaService: PrismaService, private jwtService: JwtService, private  configService: ConfigService){}

  async validateUser(username: string, password: string): Promise<Shop | null> {
    const shop = await this.prismaService.shop.findUnique({ where: { username } });
  
    if (!shop || !(await bcrypt.compare(password, shop.password))) {
      return null;
    }
  
    return shop;
  }


 


  async generateTempToken(userId: number, name:string, expiresIn:string): Promise<string> {
    return this.jwtService.signAsync(
      { userId: userId , name: name},
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

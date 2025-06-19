import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CreateCartDto } from 'src/cart/dto/create-cart.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { User  } from '@prisma/client';

@Injectable()
export class AuthService {


  constructor(private prismaService: PrismaService, private jwtService: JwtService, private  configService: ConfigService){}

  async validatUser(email: string, password: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({ where: { email } });
  
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return null;
    }
  
    return user;
  }


  async generateTempToken(userId: string, email:string, expiresIn:string): Promise<string> {
    return this.jwtService.signAsync(
      { userId: userId , email: email},
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

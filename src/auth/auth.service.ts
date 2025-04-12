import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CreateCartDto } from 'src/cart/dto/create-cart.dto';

@Injectable()
export class AuthService {

  constructor(private prismaService: PrismaService, private jwtService: JwtService){}

  async validateUser(data: CreateCartDto)
  {
    const user = await this.prismaService.user.findUnique({
      where: {
        username: data.username, // ici, il faut un objet avec une clé
      },
    });

    
  }

}

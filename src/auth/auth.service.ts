import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CreateCartDto } from 'src/cart/dto/create-cart.dto';

@Injectable()
export class AuthService {

  constructor(private prismaService: PrismaService, private jwtService: JwtService){}

  async signIn(username: string, pass: string): Promise<any> {

    
    const user = await this.prismaService.user.findUnique({
      where: { username: username },
    });


    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return result;
  }

}

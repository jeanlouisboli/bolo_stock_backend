import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'
import { User } from '@prisma/client';
import { strict } from 'assert';

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService){}

  create(createUserDto: CreateUserDto) {
    return "user create"
  }

  

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    const user = this.prisma.user.findUnique({where: { id } })
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }



  async updatePassword(userId: number,username:string, newPassword: string) {
    const hashed = await bcrypt.hash(newPassword, 10);
  
    return this.prisma.user.update({
      where: { id: userId }, // 👈 userId doit être un number
      data: { 
        username: username,
        password: hashed 
      
      },
    });
  }


  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10); // 10 = salt rounds
  }

  
}

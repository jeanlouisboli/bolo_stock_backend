import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { take } from 'rxjs';

@Injectable()
export class ShopService {

  constructor(private prismaService: PrismaService) { }

  async create(createShopDto: CreateShopDto) {


    const user = await this.prismaService.user.create({
      data: {
        username: createShopDto.email,
        email: createShopDto.email,
        role: "ENTREPRISE"
      }
    })
    const shop = await this.prismaService.shop.create({

      data: {

        name: createShopDto.name,
        email: createShopDto.email,
        adresse: createShopDto.adresse,
        ville: createShopDto.ville,
        pays: createShopDto.pays,
        latitude: createShopDto.latitude,
        longitude: createShopDto.longitude,
        userId: user.id
      }


    })
    return createShopDto;

  }

   findAll(page= 1, limit=10 ) {

    return this.prismaService.shop.findMany({
     skip: (page - 1) * limit,
     take: limit
    });


  }

  async findOne(id: number) {

    const shop = await this.prismaService.shop.findUnique({ where: { id } });

    if (!shop) throw new NotFoundException();



  }

  async update(id: number, updateShopDto: UpdateShopDto) {

    const shopUpdate = await  this.prismaService.shop.update({
      where: {
        id: id
      },
      data: {

      }
    });

    return shopUpdate
  }

  async softDeleteShop(id: number) {
    return this.prismaService.shop.update({
      where: { id },
      data: {
        deleteAt: new Date(), // Marque comme supprimé
      },
    });
  }
}

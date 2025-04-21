import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { take } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class ShopService {

  constructor(private prismaService: PrismaService, private authService: AuthService) { }

  async create(createShopDto: CreateShopDto) {

    // Vérifie si un utilisateur avec cet email ou username existe déjà
  const existingUser = await this.prismaService.shop.findFirst({
    where: {
      deletedAt:null,
      OR: [
        { email: createShopDto.email },
        { name: createShopDto.name },
      ],
    },
  });

  if (existingUser) {
    if (existingUser.email === createShopDto.email && existingUser.name === createShopDto.name) {
      throw new ConflictException("Cet email et ce nom d'entreprise sont déjà utilisés.");
    } else if (existingUser.email === createShopDto.email) {
      throw new ConflictException('Cet email est déjà utilisé.');
    } else if (existingUser.name === createShopDto.name) {
      throw new ConflictException('Ce nom d’entreprise est déjà utilisé.');
    }
  }

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

    const token = await this.authService.generateTempToken(user.id,shop.name,"5m"); // expire dans 5 min

    return {
      message: 'Entreprise et utilisateur créés',
      token, // envoyer ce token au frontend
    };

  }

  async findAll(page?: number, limit?: number) {
    const where = { deletedAt: null };
  
    // Si pas de pagination → renvoyer tous les shops
    if (!page || !limit) {
      const data = await this.prismaService.shop.findMany({ where });
      return { data, total: data.length, page: 1, limit: data.length, lastPage: 1 };
    }
  
    const [data, total] = await Promise.all([
      this.prismaService.shop.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prismaService.shop.count({ where }),
    ]);
  
    return {
      data,
      total,
      page,
      limit,
      lastPage: Math.ceil(total / limit),
    };
  }
  

  async findOne(id: number) {

    const shop = await this.prismaService.shop.findUnique({ where: { id } });

    if (!shop) throw new NotFoundException();

    return shop;

  }

  async update(id: number, updateShopDto: UpdateShopDto) {

    const shop = await this.prismaService.shop.findUnique({ where: { id } });

    if (!shop) throw new NotFoundException();


    const existingUser = await this.prismaService.shop.findFirst({
      where: {
        deletedAt:null,
        id: {
          not: id, // exclure l'élément en cours d'édition
        },
        OR: [
          { email: updateShopDto.email },
          { name: updateShopDto.name },
        ],
      },
    });
  
    if (existingUser) {
      if (existingUser.email === updateShopDto.email && existingUser.name === updateShopDto.name) {
        throw new ConflictException("Cet email et ce nom d'entreprise sont déjà utilisés.");
      } else if (existingUser.email === updateShopDto.email) {
        throw new ConflictException('Cet email est déjà utilisé.');
      } else if (existingUser.name === updateShopDto.name) {
        throw new ConflictException('Ce nom d’entreprise est déjà utilisé.');
      }
    }



    const shopUpdate = await this.prismaService.shop.update({
      where: {
        id: id
      },
      data: {
        ...updateShopDto
      }
    });

    return shopUpdate
  }

  async softDeleteShop(id: number) {
    return this.prismaService.shop.update({
      where: { id },
      data: {
        deletedAt: new Date(), // Marque comme supprimé
      },
    });
  }
}

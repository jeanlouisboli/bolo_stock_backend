import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrdersService {


  constructor(private prismaService: PrismaService) { }

  async create(createOrderDto: CreateOrderDto) {


    const existingPromotion = await this.prismaService.promotion.findUnique({
      where: {
        deletedAt: null,
        id: createOrderDto.promotionId
      },
    });

    if (!existingPromotion) {
      throw new ConflictException("Cette promotion n'existe pas.");
    }

    let user = await this.prismaService.user.findUnique({
      where: {
        deletedAt: null,
        email: createOrderDto.email
      },
    });

    if (!user) {

      throw new ConflictException("Cet utilisateur n'existe pas.");
      

    }


    const { promotionId, nomClient, numeroTelephone, email, ...orderData } = createOrderDto;

    const order = await this.prismaService.orders.create({
      data: {
        ...orderData, // quantite, prix, montant
        user: {
          connect: { id: user.id },
        },
        promotion: {
          connect: { id: promotionId },
        },
      },
    });


    this.prismaService.promotion.update({
      where: {
        id: createOrderDto.promotionId
      },
      data: {
        stock: existingPromotion.stock - createOrderDto.quantite,
        

      },

    });



    this.prismaService.partner.update({
      where: {
        id: existingPromotion.partnerId
      },
      data: {
        totalSale: existingPromotion.stock - createOrderDto.montant
      },
    });


    return order
  }

  async findAll(partenaireId, page?: number, limit?: number) {

    const where = { deletedAt: null };

    // Si pas de pagination → renvoyer tous les Partenaires
    if (!page || !limit) {
      const data = await this.prismaService.orders.findMany({ where });
      return { data, total: data.length, page: 1, limit: data.length, lastPage: 1 };
    }

    const [data, total] = await Promise.all([
      this.prismaService.orders.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prismaService.orders.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      lastPage: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {

    const product = await this.prismaService.orders.findUnique({ where: { id } });

    if (!product) throw new NotFoundException();

    return product;

  }


  async update(id: string, updateOrderDto: UpdateOrderDto, partnerId) {

    const product = await this.prismaService.product.findUnique({ where: { id, partnerId } });

    if (!product) throw new NotFoundException();


    const existingOrder = await this.prismaService.orders.findFirst({
      where: {
        deletedAt: null,
        id: {
          not: id, // exclure l'élément en cours d'édition
        },
        OR: [
          { promotionId: updateOrderDto.promotionId },

        ],
      },
    });

    if (existingOrder) {
      if (existingOrder.promotionId === updateOrderDto.promotionId) {
        throw new ConflictException("Cet libelle est deja utilisés.");
      }

    }





    return this.prismaService.product.update({
      where: {
        id: id
      },
      data: {
        ...updateOrderDto,
        partner: {
          connect: { id: partnerId },
        },
      },
      include: {
        partner: true,
      },
    });

  }

  async softDeleteOrders(partenaireId, id: string) {
    return this.prismaService.orders.update({
      where: { id },
      data: {
        deletedAt: new Date(), // Marque comme supprimé
      },
    });
  }


}

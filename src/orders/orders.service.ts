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

    let client = await this.prismaService.client.findUnique({
      where: {
        deletedAt: null,
        email: createOrderDto.email
      },
    });

    if (!client) {

      client = await this.prismaService.client.create({
        data: {
          nomClient: createOrderDto.nomClient,
          numeroTelephone: createOrderDto.numeroTelephone,
          email: createOrderDto.email
        },
      });

    }


    const { promotionId, nomClient, numeroTelephone, email, ...orderData } = createOrderDto;

    const order = await this.prismaService.orders.create({
      data: {
        ...orderData, // quantite, prix, montant
        client: {
          connect: { id: client.id },
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



    this.prismaService.partenaire.update({
      where: {
        id: existingPromotion.partenaireId
      },
      data: {
        venteTotal: existingPromotion.stock - createOrderDto.montant
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

  async findOne(id: number) {

    const product = await this.prismaService.orders.findUnique({ where: { id } });

    if (!product) throw new NotFoundException();

    return product;

  }


  async update(id: number, updateOrderDto: UpdateOrderDto, partenaireId) {

    const product = await this.prismaService.product.findUnique({ where: { id, partenaireId } });

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
        partenaire: {
          connect: { id: partenaireId },
        },
      },
      include: {
        partenaire: true,
      },
    });

  }

  async softDeleteOrders(partenaireId, id: number) {
    return this.prismaService.orders.update({
      where: { id },
      data: {
        deletedAt: new Date(), // Marque comme supprimé
      },
    });
  }


}

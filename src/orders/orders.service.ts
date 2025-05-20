import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrdersService {


  constructor(private prismaService: PrismaService) { }
  
    async create(createOrderDto: CreateOrderDto, partenaireId) {
      
       const existingOrder = await this.prismaService.orders.findFirst({
            where: {
              deletedAt: null,
              OR: [
                { promotionId: createOrderDto.promotionId,
                },
             
              ],
            },
          });
      
          if (existingOrder) {
            if (existingOrder.promotionId === createOrderDto.promotionId ) {
              throw new ConflictException("Cette promotion a déjà été utilisée.");
            } 
      
          }
      
          return this.prismaService.orders.create({
            data: {
              ...createOrderDto,
              
            },
            include: {
              promotion: true,
            },
          });
    }
  
    async findAll(partenaireId, page?: number, limit?: number) {
      
      const where = { deletedAt: null, partenaireId : partenaireId };
  
      // Si pas de pagination → renvoyer tous les Partenaires
      if (!page || !limit) {
        const data = await this.prismaService.product.findMany({ where });
        return { data, total: data.length, page: 1, limit: data.length, lastPage: 1 };
      }
  
      const [data, total] = await Promise.all([
        this.prismaService.product.findMany({
          where,
          skip: (page - 1) * limit,
          take: limit,
        }),
        this.prismaService.product.count({ where }),
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
    
        const product = await this.prismaService.product.findUnique({ where: { id,partenaireId } });
    
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
          if (existingOrder.promotionId === updateOrderDto.promotionId ) {
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
  
      async softDeleteOrders(partenaireId,id: number) {
        return this.prismaService.orders.update({
          where: { id },
          data: {
            deletedAt: new Date(), // Marque comme supprimé
          },
        });
      }


}

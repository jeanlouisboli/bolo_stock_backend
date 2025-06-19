import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { toHtmlDateFormat } from 'src/utils/function';

@Injectable()
export class PromotionService {

    constructor(private prismaService: PrismaService) { }

    async create(createPromotionDto: CreatePromotionDto, partnerId) {

        let existingProduct = null;
        if(createPromotionDto.productId)
        {
            existingProduct = await this.prismaService.product.findUnique({
                where: {
                    deletedAt: null,
                    id : createPromotionDto.productId,
                },
            });

            if (!existingProduct) throw new NotFoundException("Cet produit n'existe pas ");

        }else {

            existingProduct = await this.prismaService.product.findFirst({
                where: {
                    deletedAt: null,
                    OR: [
                        { libelle: createPromotionDto.libelle,
                          partnerId : partnerId
                        },
                     
                      ],
                },
            });

            
            
            if(!existingProduct){

                existingProduct = this.prismaService.product.create({
                    data: {
                        libelle: createPromotionDto.libelle,
                        description: createPromotionDto.description,
                        prix: createPromotionDto.prix,
                        partner: {
                            connect: { id: partnerId },
                        },

                        category: {
                            connect: { id: createPromotionDto.categoryId },
                        },
                    },
                });
            }
           
        }

       // return existingProduct;

        const promotion =  this.prismaService.promotion.create({
            data: {
                prixPromo: createPromotionDto.prixPromo,
                remise: createPromotionDto.remise,
                stock: createPromotionDto.stock,
                seuil: createPromotionDto.seuil,
                partner: {
                    connect: { id: partnerId },
                },
                product: {
                    connect: { id: existingProduct.id },
                },
            },
            include: {
                partner: true,
                product: true
            },
        });

        return promotion;
    }

    async findAll(partnerId, page?: number, limit?: number) {

        const where = { deletedAt: null, partnerId: partnerId };

        // Si pas de pagination → renvoyer tous les Partenaires
        if (!page || !limit) {
            const data = await this.prismaService.promotion.findMany({ where });
            return { data, total: data.length, page: 1, limit: data.length, lastPage: 1 };
        }

        const [data, total] = await Promise.all([
            this.prismaService.promotion.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                include: {
                    partner: true,
                    product: true
                },
            }),
            this.prismaService.promotion.count({ where }),
        ]);

        return {
            data,
            total,
            page,
            limit,
            lastPage: Math.ceil(total / limit),
        };
    }

    async findOne(partnerId, id: string) {

        const promotion = await this.prismaService.promotion.findUnique({ where: { id, partnerId },include: {
            partner: true,
            product: true
        }, });

        if (!promotion) throw new NotFoundException();

        return {
            ...promotion,
            dateDebut : toHtmlDateFormat(promotion.dateDebut),
            dateExpire : toHtmlDateFormat(promotion.dateExpire)
        };

    }

    async update(id: string, updatePromotionDto: UpdatePromotionDto, partnerId) {

        let promotion = null;
         promotion = await this.prismaService.promotion.findUnique({ where: { id, partnerId } });

        if (!promotion) throw new NotFoundException("Cette promotion n'existe pas !");


        let existingProduct = null;
        if(updatePromotionDto.productId)
        {
            existingProduct = await this.prismaService.product.findFirst({
                where: {
                    deletedAt: null,
                    OR: [
                        {
                            libelle: updatePromotionDto.libelle,
                            partnerId: partnerId
                        },
    
                    ],
                },
            });
        }else {
            existingProduct = this.prismaService.product.create({
                data: {
                    libelle: updatePromotionDto.libelle,
                    description: updatePromotionDto.description,
                    
                    prix: updatePromotionDto.prix,
                    partner: {
                        connect: { id: partnerId },
                    },
                    category: {
                        connect: { id: updatePromotionDto.categoryId },
                    },
                    
                },
                

            });
        }


        // const existingPromotion = await this.prismaService.promotion.findFirst({
        //     where: {
        //         deletedAt: null,
        //         id: {
        //             not: id, // exclure l'élément en cours d'édition
        //         },
        //         OR: [
        //             { productId: updatePromotionDto.productId },

        //         ],
        //     },
        // });

        // if (existingPromotion) {
        //     if (existingPromotion.id === updateProductDto.libelle) {
        //         throw new ConflictException("Cet libelle est deja utilisés.");
        //     }

        // }

         promotion = this.prismaService.promotion.update({
            where: {
                id: id
            },
            data: {
                prixPromo: updatePromotionDto.prixPromo,
                remise: updatePromotionDto.remise,
                stock: updatePromotionDto.stock,
                seuil: updatePromotionDto.seuil,
                dateExpire: updatePromotionDto.dateExpire,
                updatedAt : new Date(),
                product: {
                    connect: { id: existingProduct.id },
                },
                
            },
            include: {
                partner: true,
                product:true
            },
        });


        return {
            ...promotion,
            dateDebut : toHtmlDateFormat(promotion.dateDebut),
            dateExpire : toHtmlDateFormat(promotion.dateExpire)
        };

    }

    async softDeletePromotion(partnerId, id: string) {
        return this.prismaService.promotion.update({
            where: { id, partnerId },
            data: {
                deletedAt: new Date(), // Marque comme supprimé
            },
        });
    }

}

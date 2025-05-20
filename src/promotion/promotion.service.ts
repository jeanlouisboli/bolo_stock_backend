import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';

@Injectable()
export class PromotionService {



    constructor(private prismaService: PrismaService) { }

    async create(createPromotionDto: CreatePromotionDto, partenaireId) {

        let existingProduct = null;
        existingProduct = await this.prismaService.product.findFirst({
            where: {
                deletedAt: null,
                OR: [
                    {
                        libelle: createPromotionDto.libelle,
                        partenaireId: partenaireId
                    },

                ],
            },
        });

        if (!existingProduct) {
            existingProduct = this.prismaService.product.create({
                data: {
                    libelle: createPromotionDto.libelle,
                    description: createPromotionDto.description,
                    partenaire: {
                        connect: { id: partenaireId },
                    },
                },
                include: {
                    partenaire: true,
                },
            });
        }


        return this.prismaService.promotion.create({
            data: {
                categorie: createPromotionDto.categorie,
                prix: createPromotionDto.prix,
                prixPromo: createPromotionDto.prixPromo,
                remise: createPromotionDto.remise,
                stock: createPromotionDto.stock,
                seuil: createPromotionDto.seuil,
                dateExpire: createPromotionDto.dateExpire,
                partenaire: {
                    connect: { id: partenaireId },
                },
                product: {
                    connect: { id: partenaireId },
                },
            },
            include: {
                partenaire: true,
                product: true
            },
        });
    }

    async findAll(partenaireId, page?: number, limit?: number) {

        const where = { deletedAt: null, partenaireId: partenaireId };

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

    async findOne(partenaireId, id: number) {

        const promotion = await this.prismaService.product.findUnique({ where: { id, partenaireId } });

        if (!promotion) throw new NotFoundException();

        return promotion;

    }


    async update(id: number, updatePromotionDto: UpdatePromotionDto, partenaireId) {

        const promotion = await this.prismaService.promotion.findUnique({ where: { id, partenaireId } });

        if (!promotion) throw new NotFoundException();


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





        return this.prismaService.promotion.update({
            where: {
                id: id
            },
            data: {
                categorie: updatePromotionDto.categorie,
                prix: updatePromotionDto.prix,
                prixPromo: updatePromotionDto.prixPromo,
                remise: updatePromotionDto.remise,
                stock: updatePromotionDto.stock,
                seuil: updatePromotionDto.seuil,
                dateExpire: updatePromotionDto.dateExpire,
            },
            include: {
                partenaire: true,
                product:true
            },
        });

    }

    async softDeletePromotion(partenaireId, id: number) {
        return this.prismaService.promotion.update({
            where: { id, partenaireId },
            data: {
                deletedAt: new Date(), // Marque comme supprimé
            },
        });
    }

}

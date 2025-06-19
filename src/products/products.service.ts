import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {


  constructor(private prismaService: PrismaService) { }

  async create(createProductDto: CreateProductDto, partenaireId) {

    const existingProduct = await this.prismaService.product.findFirst({
      where: {
        deletedAt: null,
        OR: [
          {
            libelle: createProductDto.libelle,
            partnerId: partenaireId
          },

        ],
      },
    });

    if (existingProduct) {
      if (existingProduct.libelle === createProductDto.libelle) {
        throw new ConflictException("Cet libelle est deja utilisés.");
      }
    }


    return this.prismaService.product.create({
      data: {
        libelle: createProductDto.libelle,
        description: createProductDto.description,
        prix: createProductDto.prix,
        partner: {
          connect: { id: partenaireId },
        },
        category: {
          connect: { id: createProductDto.categoryId },
        },
      },
      include: {
        partner: true,
        category: true,
      },
    
    });
  }

  async findAll(partenaireId, page?: number, limit?: number) {

    const where = { deletedAt: null, partenaireId: partenaireId };

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

  async findOne(partnerId, id: string) {

    const product = await this.prismaService.product.findUnique({ where: { id, partnerId } });

    if (!product) throw new NotFoundException();

    return product;

  }


  async update(id: string, updateProductDto: UpdateProductDto, partnerId) {

    const product = await this.prismaService.product.findUnique({ where: { id, partnerId } });

    if (!product) throw new NotFoundException();


   let existingCategory = await this.prismaService.category.findFirst({
      where: {
        deletedAt: null,
        OR: [
          { id: updateProductDto.categoryId },
        ],
      },
    });

    if (!existingCategory) throw new NotFoundException("Cette categorie n'existe pas ");


    const existingProduct = await this.prismaService.product.findFirst({
      where: {
        deletedAt: null,
        id: {
          not: id, // exclure l'élément en cours d'édition
        },
        OR: [
          { libelle: updateProductDto.libelle },

        ],
      },
    });

    if (existingProduct) {
      if (existingProduct.libelle === updateProductDto.libelle) {
        throw new ConflictException("Cet libelle est deja utilisés.");
      }

    }





    return this.prismaService.product.update({
      where: {
        id: id
      },
      data: {
        libelle: updateProductDto.libelle,
        description: updateProductDto.description,
        prix: updateProductDto.prix,
        partner: {
          connect: { id: partnerId },
        },
        category: {
          connect: { id: updateProductDto.categoryId },
        },
        updatedAt: new Date(),
      },
      include: {
        partner: true,
        category:true
      },
    });

  }

  async softDeleteProduct(partnerId, id: string) {
    return this.prismaService.product.update({
      where: { id, partnerId },
      data: {
        deletedAt: new Date(), // Marque comme supprimé
      },
    });
  }
}

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
              { libelle: createProductDto.libelle },
           
            ],
          },
        });
    
        if (existingProduct) {
          if (existingProduct.libelle === createProductDto.libelle ) {
            throw new ConflictException("Cet libelle est deja utilisés.");
          } 
    
        }
    
        return this.prismaService.product.create({
          data: {
            ...createProductDto,
            partenaire: {
              connect: { id: partenaireId },
            },
          },
          include: {
            partenaire: true,
          },
        });
  }

  async findAll(page?: number, limit?: number) {
    
    const where = { deletedAt: null };

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
 
     const product = await this.prismaService.product.findUnique({ where: { id } });
 
     if (!product) throw new NotFoundException();
 
     return product;
 
   }

   async update(id: number, updateProductDto: UpdateProductDto, partenaireId) {
  
      const product = await this.prismaService.product.findUnique({ where: { id } });
  
      if (!product) throw new NotFoundException();
  
  
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
        if (existingProduct.libelle === updateProductDto.libelle ) {
          throw new ConflictException("Cet libelle est deja utilisés.");
        } 
  
      }
  
  
  
    
  
      return this.prismaService.product.update({
        where: {
          id: id
        },
        data: {
          ...updateProductDto,
          partenaire: {
            connect: { id: partenaireId },
          },
        },
        include: {
          partenaire: true,
        },
      });

    }

    async softDeletePartenaire(id: number) {
      return this.prismaService.product.update({
        where: { id },
        data: {
          deletedAt: new Date(), // Marque comme supprimé
        },
      });
    }
}

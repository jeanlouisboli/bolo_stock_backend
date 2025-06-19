import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategorieService {


  constructor(private prismaService: PrismaService) { }


  async create(createCategoryDto: CreateCategoryDto) {

 
    const existingCategory = await this.prismaService.category.findFirst({
      where: {
        deletedAt: null,
        OR: [
          { libelle: createCategoryDto.libelle },
        ],
      },
    });


  
    if (existingCategory) {

      throw new ConflictException('Cette categorie est déjà utilisé.');


    }




    const categorie = await this.prismaService.category.create({

      data: {
        libelle: createCategoryDto.libelle,
        deletedAt: null
      }
    })


    return {
      message: 'Categorie créé',
      categorie,

    };

  }


  async findAll(page?: number, limit?: number) {

    const where = { deletedAt: null };

    // Si pas de pagination → renvoyer tous les Partenaires
    if (!page || !limit) {
      const data = await this.prismaService.category.findMany({ where });
      return { data, total: data.length, page: 1, limit: data.length, lastPage: 1 };
    }

    const [data, total] = await Promise.all([
      this.prismaService.category.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prismaService.category.count({ where }),
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

    const categorie = await this.prismaService.category.findUnique({ where: { id } });

    if (!categorie) throw new NotFoundException();

    return categorie;

  }



   async update(id: string, updateCategoryDto: UpdateCategoryDto) {
  
      const Partenaire = await this.prismaService.category.findUnique({ where: { id } });
  
      if (!Partenaire) throw new NotFoundException();
  
  
      const existingCategory = await this.prismaService.category.findFirst({
        where: {
          deletedAt: null,
          id: {
            not: id, // exclure l'élément en cours d'édition
          },
          OR: [
            { libelle: updateCategoryDto.libelle },
     
          ],
        },
      });
  
      if (existingCategory) {
        if (existingCategory.libelle === updateCategoryDto.libelle) {
          throw new ConflictException('Cette categorie est déjà utilisé.');
        }
      }
  
  
  
      const categorieUpdate = await this.prismaService.category.update({
        where: {
          id: id
        },
        data: {
          ...updateCategoryDto,
          updatedAt : new Date()
        }
      });
  
      return categorieUpdate
    }
  
    async softDeleteCategorie(id: string) {
      return this.prismaService.category.update({
        where: { id },
        data: {
          deletedAt: new Date(), // Marque comme supprimé
        },
      });
    }
  


}

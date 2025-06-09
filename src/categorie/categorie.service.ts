import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { UpdateCategorieDto } from './dto/update-categorie.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategorieService {


  constructor(private prismaService: PrismaService) { }


  async create(createCategorieDto: CreateCategorieDto) {

 
    const existingCategorie = await this.prismaService.categorie.findFirst({
      where: {
        deletedAt: null,
        OR: [
          { libelle: createCategorieDto.libelle },
        ],
      },
    });


  
    if (existingCategorie) {

      throw new ConflictException('Cette categorie est déjà utilisé.');


    }




    const categorie = await this.prismaService.categorie.create({

      data: {
        libelle: createCategorieDto.libelle,
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
      const data = await this.prismaService.categorie.findMany({ where });
      return { data, total: data.length, page: 1, limit: data.length, lastPage: 1 };
    }

    const [data, total] = await Promise.all([
      this.prismaService.categorie.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prismaService.categorie.count({ where }),
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

    const categorie = await this.prismaService.categorie.findUnique({ where: { id } });

    if (!categorie) throw new NotFoundException();

    return categorie;

  }



   async update(id: string, updateCategorieDto: UpdateCategorieDto) {
  
      const Partenaire = await this.prismaService.categorie.findUnique({ where: { id } });
  
      if (!Partenaire) throw new NotFoundException();
  
  
      const existingCategorie = await this.prismaService.categorie.findFirst({
        where: {
          deletedAt: null,
          id: {
            not: id, // exclure l'élément en cours d'édition
          },
          OR: [
            { libelle: updateCategorieDto.libelle },
     
          ],
        },
      });
  
      if (existingCategorie) {
        if (existingCategorie.libelle === updateCategorieDto.libelle) {
          throw new ConflictException('Cette categorie est déjà utilisé.');
        }
      }
  
  
  
      const categorieUpdate = await this.prismaService.categorie.update({
        where: {
          id: id
        },
        data: {
          ...updateCategorieDto,
          updatedAt : new Date()
        }
      });
  
      return categorieUpdate
    }
  
    async softDeleteCategorie(id: string) {
      return this.prismaService.categorie.update({
        where: { id },
        data: {
          deletedAt: new Date(), // Marque comme supprimé
        },
      });
    }
  


}

import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTypePartenaireDto } from './dto/create-type-partenaire.dto';
import { UpdateTypePartenaireDto } from './dto/update-type-partenaire.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TypePartenaireService {

  constructor(private readonly prismaService : PrismaService){}
  
  async create(createTypePartenaireDto: CreateTypePartenaireDto) {
  
   
      const existingTypePartenaire = await this.prismaService.typePartner.findFirst({
        where: {
          deletedAt: null,
          OR: [
            { libelle: createTypePartenaireDto.libelle },
          ],
        },
      });
  
  
    
      if (existingTypePartenaire) {
  
        throw new ConflictException('Ce type de partenaire est déjà utilisé.');
  
  
      }
  
  
  
  
      const typePartenaire = await this.prismaService.typePartner.create({
  
        data: {
          libelle: createTypePartenaireDto.libelle,
          deletedAt: null
        }
      })
  
  
      return {
        message: 'Type de partenaire créé',
        typePartenaire,
  
      };
  
    }
  
  
    async findAll(page?: number, limit?: number) {
  
      const where = { deletedAt: null };
  
      // Si pas de pagination → renvoyer tous les Partenaires
      if (!page || !limit) {
        const data = await this.prismaService.typePartner.findMany({ where });
        return { data, total: data.length, page: 1, limit: data.length, lastPage: 1 };
      }
  
      const [data, total] = await Promise.all([
        this.prismaService.typePartner.findMany({
          where,
          skip: (page - 1) * limit,
          take: limit,
        }),
        this.prismaService.typePartner.count({ where }),
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
  
      const typePartenaire = await this.prismaService.typePartner.findUnique({ where: { id } });
  
      if (!typePartenaire) throw new NotFoundException();
  
      return typePartenaire;
  
    }
  
  
  
     async update(id: string, updateTypePartenaireDto: UpdateTypePartenaireDto) {
    
        const typePartenaire = await this.prismaService.typePartner.findUnique({ where: { id } });
    
        if (!typePartenaire) throw new NotFoundException();
    
    
        const existingTypePartenaire = await this.prismaService.typePartner.findFirst({
          where: {
            deletedAt: null,
            id: {
              not: id, // exclure l'élément en cours d'édition
            },
            OR: [
              { libelle: updateTypePartenaireDto.libelle },
       
            ],
          },
        });
    
        if (existingTypePartenaire) {
          if (existingTypePartenaire.libelle === updateTypePartenaireDto.libelle) {
            throw new ConflictException('Cet type de partenaire est déjà utilisé.');
          }
        }
    
    
    
        const typePartenaireUpdate = await this.prismaService.typePartner.update({
          where: {
            id: id
          },
          data: {
            ...updateTypePartenaireDto,
            updatedAt : new Date()
          }
        });
    
        return typePartenaireUpdate
      }
    
      async softDeleteTypePartenaire(id: string) {
        return this.prismaService.category.update({
          where: { id },
          data: {
            deletedAt: new Date(), // Marque comme supprimé
          },
        });
      }


}

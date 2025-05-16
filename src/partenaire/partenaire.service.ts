import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePartenaireDto } from './dto/create-partenaire.dto';
import { UpdatePartenaireDto } from './dto/update-partenaire.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { take } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import * as bcrypt from 'bcrypt';
import { AddLocationPartenaireDto } from './dto/add-location-partenaire.dto';

@Injectable()
export class PartenaireService {

  constructor(private prismaService: PrismaService, private authService: AuthService) { }

  async create(createPartenaireDto: CreatePartenaireDto) {

    // Vérifie si un utilisateur avec cet email ou username existe déjà
    const existingPartenaire = await this.prismaService.partenaire.findFirst({
      where: {
        deletedAt: null,
        OR: [
          { email: createPartenaireDto.email },
          { name: createPartenaireDto.name },
          { username: createPartenaireDto.username },
        ],
      },
    });

    if (existingPartenaire) {
      if (existingPartenaire.email === createPartenaireDto.email && existingPartenaire.name === createPartenaireDto.name) {
        throw new ConflictException("Cet email et ce nom d'entreprise sont déjà utilisés.");
      } else if (existingPartenaire.name === createPartenaireDto.name) {
        throw new ConflictException('Ce nom d’entreprise est déjà utilisé.');
      } else if (existingPartenaire.email === createPartenaireDto.email) {
        throw new ConflictException('Cet email est déjà utilisé.');
      }
      else if (existingPartenaire.username === createPartenaireDto.username) {
        throw new ConflictException('Ce username  est déjà utilisé.');
      }

    }


    const hashedPassword = await bcrypt.hash(createPartenaireDto.password, 10);

    // const user = await this.prismaService.user.create({
    //   data: {
    //     username: createPartenaireDto.email,
    //     email: createPartenaireDto.email,
    //     role: "ENTREPRISE"
    //   }
    // })

    const partenaire = await this.prismaService.partenaire.create({

      data: {
        name: createPartenaireDto.name,
        type_commerce: createPartenaireDto.type_commerce,
        email: createPartenaireDto.email,
        adresse: createPartenaireDto.adresse,
        ville: createPartenaireDto.ville,
        pays: createPartenaireDto.pays,
        username : createPartenaireDto.email,
        password: hashedPassword,
        latitude: createPartenaireDto.latitude,
        longitude: createPartenaireDto.longitude,

      }
    })

    const token = await this.authService.generateTempToken(partenaire.id, partenaire.email, "5m"); // expire dans 5 min

    return {
      message: 'Entreprise créé',
      partenaire,
      token // envoyer ce token au frontend
    };

  }

  async findAll(page?: number, limit?: number) {
    
    const where = { deletedAt: null };

    // Si pas de pagination → renvoyer tous les Partenaires
    if (!page || !limit) {
      const data = await this.prismaService.partenaire.findMany({ where });
      return { data, total: data.length, page: 1, limit: data.length, lastPage: 1 };
    }

    const [data, total] = await Promise.all([
      this.prismaService.partenaire.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prismaService.partenaire.count({ where }),
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

    const partenaire = await this.prismaService.partenaire.findUnique({ where: { id } });

    if (!partenaire) throw new NotFoundException();

    return partenaire;

  }


  async addLocationPartenaire(id: number, addLocationPartenaire: AddLocationPartenaireDto) {

    const partenaire = await this.prismaService.partenaire.findUnique({ where: { id } });

    if (!partenaire) throw new NotFoundException("Le super marché n'existe pas");


    const updadePartenaire = this.prismaService.partenaire.update({
      where: { id },
      data: {
        longitude: addLocationPartenaire.longitude,
        latitude: addLocationPartenaire.latitude,
      },
    });

   return updadePartenaire

  }

  async update(id: number, updatePartenaireDto: UpdatePartenaireDto) {

    const Partenaire = await this.prismaService.partenaire.findUnique({ where: { id } });

    if (!Partenaire) throw new NotFoundException();


    const existingPartenaire = await this.prismaService.partenaire.findFirst({
      where: {
        deletedAt: null,
        id: {
          not: id, // exclure l'élément en cours d'édition
        },
        OR: [
          { email: updatePartenaireDto.email },
          { name: updatePartenaireDto.name },
        ],
      },
    });

    if (existingPartenaire) {
      if (existingPartenaire.email === updatePartenaireDto.email && existingPartenaire.name === updatePartenaireDto.name) {
        throw new ConflictException("Cet email et ce nom d'entreprise sont déjà utilisés.");
      } else if (existingPartenaire.email === updatePartenaireDto.email) {
        throw new ConflictException('Cet email est déjà utilisé.');
      } else if (existingPartenaire.name === updatePartenaireDto.name) {
        throw new ConflictException('Ce nom d’entreprise est déjà utilisé.');
      }
    }



    const PartenaireUpdate = await this.prismaService.partenaire.update({
      where: {
        id: id
      },
      data: {
        ...updatePartenaireDto
      }
    });

    return PartenaireUpdate
  }

  async softDeletePartenaire(id: number) {
    return this.prismaService.partenaire.update({
      where: { id },
      data: {
        deletedAt: new Date(), // Marque comme supprimé
      },
    });
  }
}

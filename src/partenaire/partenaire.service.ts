import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { take } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import * as bcrypt from 'bcrypt';
import { AddLocationPartnerDto } from './dto/add-location-partner.dto';
import { TypeUser } from '@prisma/client';

@Injectable()
export class PartenaireService {

  constructor(private prismaService: PrismaService, private authService: AuthService) { }

  async create(createPartnerDto: CreatePartnerDto) {

     // Vérifie si un utilisateur avec cet email ou username existe déjà
    const existingTypePartner = await this.prismaService.typePartner.findFirst({
      where: {
        deletedAt: null,
        OR: [
          { id: createPartnerDto.typePartnerId },
        ],
      },
    });
    if(!existingTypePartner){
      throw new NotFoundException("Ce type de partenaire est inexistant !")
    }



    // Vérifie si un utilisateur avec cet email ou username existe déjà
    const existingPartenaire = await this.prismaService.partner.findFirst({
      where: {
        deletedAt: null,
        OR: [
          { email: createPartnerDto.email },
          { name: createPartnerDto.namePartner },
        
        ],
      },
    });

    
    if (existingPartenaire) {
      if (existingPartenaire.email === createPartnerDto.email && existingPartenaire.name === createPartnerDto.namePartner) {
        throw new ConflictException("Cet email et ce nom d'entreprise sont déjà utilisés.");
      } else if (existingPartenaire.name === createPartnerDto.namePartner) {
        throw new ConflictException('Ce nom d’entreprise est déjà utilisé.');
      } else if (existingPartenaire.email === createPartnerDto.email) {
        throw new ConflictException('Cet email est déjà utilisé.');
      }
    

    }


    const hashedPassword = await bcrypt.hash(createPartnerDto.password, 10);

    

    const partner = await this.prismaService.partner.create({

      data: {
        name: createPartnerDto.namePartner,
        typePartnerId: createPartnerDto.typePartnerId,
        email: createPartnerDto.email,
        adress: createPartnerDto.adress,
        city: createPartnerDto.city,
        country: createPartnerDto.country,
        // username : createPartnerDto.username??createPartnerDto.email,
        // password: hashedPassword,
        deletedAt: null

      }
    })


    const user = await this.prismaService.user.create({
      data: {
        name: createPartnerDto.nameUser,
        phone: createPartnerDto.phone,
        email: createPartnerDto.email,
        password: hashedPassword,
        type_user:  TypeUser.PARTENAIRE,
        partnerId: partner.id
      }
    })


    const token = await this.authService.generateTempToken(user.id, user.email, "5m"); // expire dans 5 min

    return {
      message: 'Entreprise créé',
      partner,
      user,
      token // envoyer ce token au frontend
    };

  }

  async findAll(page?: number, limit?: number) {
    
    const where = { deletedAt: null };

    // Si pas de pagination → renvoyer tous les partner
    if (!page || !limit) {
      const data = await this.prismaService.partner.findMany({ where });
      return { data, total: data.length, page: 1, limit: data.length, lastPage: 1 };
    }

    const [data, total] = await Promise.all([
      this.prismaService.partner.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prismaService.partner.count({ where }),
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

    const partner = await this.prismaService.partner.findUnique({ where: { id } });

    if (!partner) throw new NotFoundException();

    return partner;

  }


  async addLocationPartner(id: string, addLocationPartner: AddLocationPartnerDto) {

    const partner = await this.prismaService.partner.findUnique({ where: { id } });

    if (!partner) throw new NotFoundException("Le super marché n'existe pas");


    const updadePartner = this.prismaService.partner.update({
      where: { id },
      data: {
        longitude: addLocationPartner.longitude,
        latitude: addLocationPartner.latitude,
      },
    });

   return updadePartner

  }

  async update(id: string, updatePartnerDto: UpdatePartnerDto) {

    const partner = await this.prismaService.partner.findUnique({ where: { id } });

    if (!partner) throw new NotFoundException();


    const existingPartner = await this.prismaService.partner.findFirst({
      where: {
        deletedAt: null,
        id: {
          not: id, // exclure l'élément en cours d'édition
        },
        OR: [
          { email: updatePartnerDto.email },
          { name: updatePartnerDto.namePartner },
        ],
      },
    });

    if (existingPartner) {
      if (existingPartner.email === updatePartnerDto.email && existingPartner.name === updatePartnerDto.namePartner) {
        throw new ConflictException("Cet email et ce nom d'entreprise sont déjà utilisés.");
      } else if (existingPartner.email === updatePartnerDto.email) {
        throw new ConflictException('Cet email est déjà utilisé.');
      } else if (existingPartner.name === updatePartnerDto.namePartner) {
        throw new ConflictException('Ce nom d’entreprise est déjà utilisé.');
      }
    }



    const partnerUpdate = await this.prismaService.partner.update({
      where: {
        id: id
      },
      data: {
        ...updatePartnerDto,
        updatedAt : new Date()
      }
    });

    return partnerUpdate
  }

  async softDeletePartner(id: string) {
    return this.prismaService.partner.update({
      where: { id },
      data: {
        deletedAt: new Date(), // Marque comme supprimé
      },
    });
  }

  
}

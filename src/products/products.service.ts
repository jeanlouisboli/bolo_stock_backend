import { ConflictException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {


  constructor(private prismaService: PrismaService) { }

  async create(createProductDto: CreateProductDto) {


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
    
        const product = await this.prismaService.product.create({

          data: {
            ...createProductDto
          }
        })

    return 'This action adds a new product';
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}

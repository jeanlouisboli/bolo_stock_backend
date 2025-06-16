import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional, IsDate, IsDateString, IsNumber, Matches } from 'class-validator';

export class CreateProductDto {

  @ApiProperty()
  @IsString()
  libelle: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  @Matches(/^[a-fA-F0-9]{24}$/, {
    message: 'categorieId doit être un ObjectId MongoDB valide (24 caractères hexadécimaux)',
  })
  categoryId: string;

  @ApiProperty()
  @IsNumber()
  prix: number

 
}

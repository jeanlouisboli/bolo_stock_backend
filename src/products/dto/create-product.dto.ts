import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional, IsDate, IsDateString } from 'class-validator';

export class CreateProductDto {

  @ApiProperty()
  @IsString()
  libelle: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  categorie: string;

  @ApiProperty()
  @IsInt()
  prix: number;

  @ApiProperty()
  @IsInt()
  prixPromo: number;

  @ApiProperty()
  @IsInt()
  remise: number;

  @ApiProperty()
  @IsInt()
  stock: number;

  @ApiProperty()
  @IsInt()
  seuil: number;

  @ApiProperty()
  @IsInt()
  shopId: number;

  @ApiProperty({ type: String, format: 'date-time' })
  @IsDateString()
  dateExpire: Date;
}

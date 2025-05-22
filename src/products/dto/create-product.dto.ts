import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional, IsDate, IsDateString, IsNumber } from 'class-validator';

export class CreateProductDto {

  @ApiProperty()
  @IsString()
  libelle: string;

  @ApiProperty()
  @IsString()
  description: string;

  


 
}

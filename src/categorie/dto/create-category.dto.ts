import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional, IsDate, IsDateString, IsNumber } from 'class-validator';

export class CreateCategoryDto {

  @ApiProperty()
  @IsString()
  libelle: string;
 
}

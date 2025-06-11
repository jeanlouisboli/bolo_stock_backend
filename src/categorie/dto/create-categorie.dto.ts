import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional, IsDate, IsDateString, IsNumber } from 'class-validator';

export class CreateCategorieDto {

  @ApiProperty()
  @IsString()
  libelle: string;
 
}

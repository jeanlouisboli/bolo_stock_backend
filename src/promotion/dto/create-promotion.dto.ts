import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePromotionDto {

      @ApiProperty()
      @IsString()
      libelle:string

      @ApiProperty()
      @IsString()
      description:string

      @ApiProperty()
      @IsString()
      categorie:string

      @ApiProperty()
      @IsNumber()
      prix:number

      @ApiProperty()
      @IsOptional()
      @IsNumber()
      productId?: number

      @ApiProperty()
      @IsNumber()
      prixPromo:number

      @ApiProperty()
      @IsNumber()
      remise: number

      @ApiProperty()
      @IsNumber()
      stock:number

      @ApiProperty()
      @IsNumber()
      seuil:number

      @ApiProperty()
      @IsDate()
      @Type(()=>Date)
      @IsOptional()
      dateDebut?: Date

      @ApiProperty()
      @IsDate()
      @Type(()=>Date)
      @IsOptional()
      dateExpire?: Date      
}

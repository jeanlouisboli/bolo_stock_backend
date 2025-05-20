import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePromotionDto {

      @ApiProperty()
      @IsString()
      libelle:string

      @ApiProperty()
      @IsString()
      description:string

      @ApiProperty()
      @IsOptional()
      @IsNumber()
      productId?: number


      @ApiProperty()
      @IsString()
      categorie:string

      @ApiProperty()
      @IsNumber()
      prix:number

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
      @IsDateString()
      dateExpire: Date

     
      
}

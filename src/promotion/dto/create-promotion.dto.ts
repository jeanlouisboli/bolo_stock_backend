import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsDateString, IsNumber, IsOptional, IsString, Matches } from "class-validator";

export class CreatePromotionDto {

      @ApiProperty()
      @IsString()
      libelle:string

      @ApiProperty()
      @IsString()
      description:string

      @ApiProperty()
      @IsNumber()
      @Matches(/^[a-fA-F0-9]{24}$/, {
          message: 'categorieId doit être un ObjectId MongoDB valide (24 caractères hexadécimaux)',
        })
      categoryId:string

      @ApiProperty()
      @IsNumber()
      prix:number

      @ApiProperty()
      @IsOptional()
      @IsNumber()
      @Matches(/^[a-fA-F0-9]{24}$/, {
    message: 'categorieId doit être un ObjectId MongoDB valide (24 caractères hexadécimaux)',
  })
      productId?: string

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

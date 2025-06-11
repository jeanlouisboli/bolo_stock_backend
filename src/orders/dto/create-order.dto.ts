import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsString } from "class-validator";

export class CreateOrderDto {


      @ApiProperty()
      @IsNumber()
      promotionId: string;
    
      @ApiProperty()
      @IsNumber()
      quantite: number;


      @ApiProperty()
      @IsNumber()
      prix: number;

      @ApiProperty()
      @IsNumber()
      montant: number;

      @ApiProperty()
      @IsString()
      nomClient: string

      @ApiProperty()
      @IsString()
      numeroTelephone: string

      @ApiProperty()
      @IsEmail()
      email:string
}

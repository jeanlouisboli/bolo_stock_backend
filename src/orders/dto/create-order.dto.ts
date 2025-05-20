import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateOrderDto {


      @ApiProperty()
      @IsNumber()
      promotionId: number;
    
      @ApiProperty()
      @IsNumber()
      quantite: number;


      @ApiProperty()
      @IsNumber()
      prix: number;

      @ApiProperty()
      @IsString()
      nomClient: string

      @ApiProperty()
      @IsString()
      numeroTelephone: string

      @ApiProperty()
      @IsString()
      email:string
}

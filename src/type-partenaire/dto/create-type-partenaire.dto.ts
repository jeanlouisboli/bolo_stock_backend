import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateTypePartenaireDto {


      @ApiProperty()
      @IsString()
      libelle: string;
}

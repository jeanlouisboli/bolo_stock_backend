import { PartialType } from '@nestjs/swagger';
import { CreateTypePartenaireDto } from './create-type-partenaire.dto';

export class UpdateTypePartenaireDto extends PartialType(CreateTypePartenaireDto) {}

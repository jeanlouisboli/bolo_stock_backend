import { PartialType } from '@nestjs/mapped-types';
import { CreatePartenaireDto } from './create-Partenaire.dto';

export class UpdatePartenaireDto extends PartialType(CreatePartenaireDto) {}

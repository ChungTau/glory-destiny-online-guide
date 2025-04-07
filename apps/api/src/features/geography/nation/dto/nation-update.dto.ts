import { PartialType } from '@nestjs/mapped-types';
import { NationCreateDto } from './nation-create.dto';

export class NationUpdateDto extends PartialType(NationCreateDto) {}

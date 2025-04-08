import { PartialType } from '@nestjs/mapped-types';
import { RaceCreateDto } from './race-create.dto';

export class RaceUpdateDto extends PartialType(RaceCreateDto) {
  name?: string;
  description?: string | null; // 改為 string | null
}
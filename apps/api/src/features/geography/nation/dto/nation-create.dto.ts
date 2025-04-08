import { IsString } from 'class-validator';

export class NationCreateDto {
  @IsString()
  name!: string;
}

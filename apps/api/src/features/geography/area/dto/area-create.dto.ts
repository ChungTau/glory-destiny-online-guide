import { IsInt, IsString, MinLength, Min } from 'class-validator';

export class AreaCreateDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsInt()
  @Min(1)
  nationId: number;
}

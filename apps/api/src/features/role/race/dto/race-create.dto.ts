import { IsString, MinLength, MaxLength } from 'class-validator';

export class RaceCreateDto {
  @IsString()
  @MinLength(1, { message: '種族名稱唔可以為空' })
  @MaxLength(50, { message: '種族名稱唔可以超過 50 個字符' })
  name!: string;

  @IsString()
  @MaxLength(500, { message: '種族描述唔可以超過 500 個字符' })
  description?: string | null; // 改為 string | null
}
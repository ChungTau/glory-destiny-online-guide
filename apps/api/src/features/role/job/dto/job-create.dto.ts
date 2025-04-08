// apps/api/src/job/dto/create-job.dto.ts
import { IsInt, IsString, MinLength, MaxLength, Min, IsEnum, IsOptional } from 'class-validator';
import { Faction, JobStage } from '@glory-destiny-online-guide/prisma';

export class JobCreateDto {
  @IsString()
  @MinLength(1, { message: '職業名稱唔可以為空' })
  @MaxLength(50, { message: '職業名稱唔可以超過 50 個字符' })
  name!: string;

  @IsInt()
  @Min(1, { message: '種族 ID 必須係正整數' })
  raceId!: number;

  @IsEnum(Faction, { message: '陣營必須係有效嘅枚舉值' })
  faction!: Faction;

  @IsEnum(JobStage, { message: '階段必須係有效嘅枚舉值' })
  stage!: JobStage;

  @IsOptional()
  @IsInt()
  @Min(0, { message: '最低晉升等級唔可以係負數' })
  minPromotionLevel?: number | null; // 改為 number | null

  @IsOptional()
  @IsString()
  @MaxLength(255, { message: '圖標 URL 唔可以超過 255 個字符' })
  iconUrl?: string | null; // 改為 string | null

  @IsOptional()
  @IsInt()
  @Min(1, { message: '父職業 ID 必須係正整數' })
  parentJobId?: number | null; // 改為 number | null
}
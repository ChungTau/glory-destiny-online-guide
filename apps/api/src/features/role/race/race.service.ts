// apps/api/src/features/geography/race/race.service.ts
import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/base.service';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { RedisService } from 'src/core/redis/redis.service';
import { RaceCreateDto } from './dto/race-create.dto';
import { RaceUpdateDto } from './dto/race-update.dto';
import { Race, RaceInclude, Prisma } from '@glory-destiny-online-guide/prisma';
import { PaginatedResult } from 'src/core/base.service';
import { RaceResponseDto } from './dto/race-response.dto';

@Injectable()
export class RaceService extends BaseService<
  Race,
  RaceResponseDto,
  typeof Prisma.ModelName.Race,
  RaceCreateDto,
  RaceUpdateDto,
  RaceInclude
> {
  protected readonly entityName = Prisma.ModelName
    .Race as typeof Prisma.ModelName.Race;

  constructor(prisma: PrismaService, redis: RedisService) {
    super(prisma, redis);
  }

  // 簡單查詢（無關聯）
  async findOneSimple(id: number): Promise<Race> {
    return this.findOne(id); // 用 BaseService 嘅 findOne，無 include
  }

  // 動態查詢（帶可選關聯）
  async findOneWithInclude(
    id: number,
    include?: RaceInclude,
  ): Promise<Race> {
    return this.findOne(id, include);
  }

  // 分頁查詢（帶可選關聯）
  async findManyPaginatedWithInclude(
    params = {},
    include?: RaceInclude,
  ): Promise<PaginatedResult<Race>> {
    return this.findManyPaginated({ ...params, include });
  }
}

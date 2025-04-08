// apps/api/src/features/geography/area/area.service.ts
import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/base.service';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { RedisService } from 'src/core/redis/redis.service';
import { AreaCreateDto } from './dto/area-create.dto';
import { AreaUpdateDto } from './dto/area-update.dto';
import { Area, AreaInclude, Prisma } from '@glory-destiny-online-guide/prisma';
import { PaginatedResult } from 'src/core/base.service';
import { AreaResponseDto } from './dto/area-response.dto';

@Injectable()
export class AreaService extends BaseService<
  Area,
  AreaResponseDto,
  typeof Prisma.ModelName.Area,
  AreaCreateDto,
  AreaUpdateDto,
  AreaInclude
> {
  protected readonly entityName = Prisma.ModelName
    .Area as typeof Prisma.ModelName.Area;

  constructor(prisma: PrismaService, redis: RedisService) {
    super(prisma, redis);
  }

  // 簡單查詢（無關聯）
  async findOneSimple(id: number): Promise<Area> {
    return this.findOne(id); // 用 BaseService 嘅 findOne，無 include
  }

  // 動態查詢（帶可選關聯）
  async findOneWithInclude(
    id: number,
    include?: AreaInclude,
  ): Promise<Area> {
    return this.findOne(id, include);
  }

  // 分頁查詢（帶可選關聯）
  async findManyPaginatedWithInclude(
    params = {},
    include?: AreaInclude,
  ): Promise<PaginatedResult<Area>> {
    return this.findManyPaginated({ ...params, include });
  }
}

// apps/api/src/features/geography/nation/nation.service.ts
import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/base.service';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { RedisService } from 'src/core/redis/redis.service';
import { NationCreateDto } from './dto/nation-create.dto';
import { NationUpdateDto } from './dto/nation-update.dto';
import { Nation, NationInclude, Prisma } from '@glory-destiny-online-guide/prisma';
import { PaginatedResult } from 'src/core/base.service';

@Injectable()
export class NationService extends BaseService<
  Nation,
  typeof Prisma.ModelName.Nation,
  NationCreateDto,
  NationUpdateDto,
  NationInclude
> {
  protected readonly entityName = Prisma.ModelName
    .Nation as typeof Prisma.ModelName.Nation;

  constructor(prisma: PrismaService, redis: RedisService) {
    super(prisma, redis);
  }

  // 簡單查詢（無關聯）
  async findOneSimple(id: number): Promise<Nation> {
    return this.findOne(id); // 用 BaseService 嘅 findOne，無 include
  }

  // 動態查詢（帶可選關聯）
  async findOneWithInclude(
    id: number,
    include?: NationInclude,
  ): Promise<Nation> {
    return this.findOne(id, include);
  }

  // 分頁查詢（帶可選關聯）
  async findManyPaginatedWithInclude(
    params = {},
    include?: NationInclude,
  ): Promise<PaginatedResult<Nation>> {
    return this.findManyPaginated({ ...params, include });
  }
}

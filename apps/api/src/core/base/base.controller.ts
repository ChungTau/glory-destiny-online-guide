// apps/api/src/core/base/base.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  BadRequestException,
  ParseIntPipe,
} from '@nestjs/common';
import { BaseService, PaginatedResult } from './base.service';
import { PaginatedQueryParams } from '../../common/dto/query-params.dto';
import { Prisma } from '@glory-destiny-online-guide/prisma';
import {
  EntityCreateInput,
  EntityUpdateInput,
  EntityCreateManyInput,
  EntityUpdateManyInput,
  Identifiable,
  EntityWhereInput,
} from '../../common/types/prisma.types';

@Controller()
export abstract class BaseController<
  T extends Identifiable,
  K extends Prisma.ModelName,
  I extends
    Prisma.TypeMap['model'][K]['operations']['findUnique']['args']['include'] = {},
  S extends
    Prisma.TypeMap['model'][K]['operations']['findUnique']['args']['select'] = {},
> {
  protected abstract readonly service: BaseService<T, K, I, S>;

  @Post()
  async create(@Body() createDto: EntityCreateInput<K>): Promise<T> {
    return this.service.createOne(createDto);
  }

  @Post('bulk')
  async bulkCreate(
    @Body() createDtos: EntityCreateInput<K>[],
  ): Promise<Prisma.BatchPayload> {
    if (!Array.isArray(createDtos) || createDtos.length === 0) {
      throw new BadRequestException('createDtos 必須係非空數組');
    }
    return this.service.bulkCreate(createDtos);
  }

  @Post('many')
  async createMany(
    @Body() createManyDto: EntityCreateManyInput<K>,
    @Query('include') includeStr?: string,
    @Query('select') selectStr?: string,
  ): Promise<T[]> {
    const include = this.parseInclude(includeStr);
    const select = this.parseSelect(selectStr);
    if (include && select)
      throw new BadRequestException('唔可以同時用 include 同 select');
    return this.service.createMany(createManyDto, include, select);
  }

  @Get()
  async findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit = 10,
    @Query() query: PaginatedQueryParams,
    @Query('where') whereStr?: string,
    @Query('include') includeStr?: string,
    @Query('select') selectStr?: string,
  ): Promise<PaginatedResult<T>> {
    const include = this.parseInclude(includeStr);
    const select = this.parseSelect(selectStr);
    const where = this.parseWhere(whereStr);
    if (include && select)
      throw new BadRequestException('唔可以同時用 include 同 select');
    return this.service.findManyPaginated({
      ...query,
      page,
      limit,
      where,
      include,
      select,
    });
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query('include') includeStr?: string,
    @Query('select') selectStr?: string,
  ): Promise<T> {
    const include = this.parseInclude(includeStr);
    const select = this.parseSelect(selectStr);
    if (include && select)
      throw new BadRequestException('唔可以同時用 include 同 select');
    return this.service.findOne(id, include, select);
  }

  @Patch()
  async updateMany(
    @Query('where') whereStr: string,
    @Body() updateDto: EntityUpdateManyInput<K>,
  ): Promise<Prisma.BatchPayload> {
    const where = this.parseWhere(whereStr);
    return this.service.updateMany(where, updateDto);
  }

  @Patch('bulk')
  async bulkUpdate(
    @Body() updates: { id: number; data: EntityUpdateInput<K> }[],
  ): Promise<T[]> {
    if (!Array.isArray(updates) || updates.length === 0) {
      throw new BadRequestException('updates 必須係非空數組');
    }
    return this.service.bulkUpdate(updates);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: EntityUpdateInput<K>,
  ): Promise<T> {
    return this.service.updateOne(id, updateDto);
  }

  @Delete()
  async removeMany(
    @Query('where') whereStr: string,
  ): Promise<Prisma.BatchPayload> {
    const where = this.parseWhere(whereStr);
    return this.service.removeMany(where);
  }

  @Delete('bulk')
  async bulkRemove(@Body() ids: number[]): Promise<Prisma.BatchPayload> {
    if (!Array.isArray(ids) || ids.length === 0) {
      throw new BadRequestException('ids 必須係非空數組');
    }
    return this.service.bulkRemove(ids);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<T> {
    return this.service.remove(id);
  }

  protected parseInclude(includeStr?: string): I | undefined {
    if (!includeStr) return undefined;
    try {
      return JSON.parse(includeStr) as I;
    } catch (error) {
      throw new BadRequestException('無效嘅 include 參數');
    }
  }

  protected parseSelect(selectStr?: string): S | undefined {
    if (!selectStr) return undefined;
    try {
      return JSON.parse(selectStr) as S;
    } catch (error) {
      throw new BadRequestException('無效嘅 select 參數');
    }
  }

  protected parseWhere(whereStr?: string): EntityWhereInput<K> {
    if (!whereStr) return undefined;
    try {
      return JSON.parse(whereStr) as EntityWhereInput<K>;
    } catch (error) {
      throw new BadRequestException('無效嘅 where 參數', whereStr);
    }
  }
}

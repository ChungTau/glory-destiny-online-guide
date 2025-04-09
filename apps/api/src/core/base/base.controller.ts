// apps/api/src/core/base.controller.ts
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
} from '@nestjs/common';
import { BaseService, PaginatedResult} from './base.service';
import { PaginatedQueryParams } from '../../common/dto/query-params.dto';
import { Prisma } from '@glory-destiny-online-guide/prisma';
import {
  EntityCreateInput,
  EntityUpdateInput,
  Identifiable
} from '../../common/types/prisma.types';

@Controller()
export abstract class BaseController<
  T extends Identifiable,
  K extends Prisma.ModelName,
  I extends Prisma.TypeMap['model'][K]['operations']['findUnique']['args']['include'] = {}, // 用 Prisma Include 類型
  S extends Prisma.TypeMap['model'][K]['operations']['findUnique']['args']['select'] = {}, // 用 Prisma Select 類型
> {
  protected abstract readonly service: BaseService<T, K, I, S>;

  @Post()
  async create(@Body() createDto: EntityCreateInput<K>): Promise<T> {
    return this.service.createOne(createDto);
  }

  @Get()
  async findAll(
    @Query() query: PaginatedQueryParams,
    @Query('include') includeStr?: string,
    @Query('select') selectStr?: string,
  ): Promise<PaginatedResult<T>> {
    const include = this.parseInclude(includeStr);
    const select = this.parseSelect(selectStr);
    if (include && select) throw new BadRequestException('唔可以同時用 include 同 select');
    return this.service.findManyPaginated({ ...query, include, select });
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query('include') includeStr?: string,
    @Query('select') selectStr?: string,
  ): Promise<T> {
    const include = this.parseInclude(includeStr);
    const select = this.parseSelect(selectStr);
    if (include && select) throw new BadRequestException('唔可以同時用 include 同 select');
    return this.service.findOne(+id, include, select);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: EntityUpdateInput<K>,
  ): Promise<T> {
    return this.service.updateOne(+id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<T> {
    return this.service.remove(+id);
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
}
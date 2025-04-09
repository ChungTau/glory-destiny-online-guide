// apps/api/src/core/junction.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { JunctionService, PaginatedResult } from './junction.service';
import { PaginatedQueryParams } from '../../common/dto/query-params.dto';
import { Prisma } from '@glory-destiny-online-guide/prisma';
import {
  EntityCreateInput,
  EntityUpdateInput,
  EntityWhereInput,
} from '../../common/types/prisma.types';

@Controller()
export abstract class JunctionController<
  T extends { [key: string]: any },
  K extends Prisma.ModelName,
  I extends
    Prisma.TypeMap['model'][K]['operations']['findUnique']['args']['include'] = {},
  S extends
    Prisma.TypeMap['model'][K]['operations']['findUnique']['args']['select'] = {},
> {
  protected abstract readonly service: JunctionService<T, K, I, S>;

  @Post()
  async create(@Body() createDto: EntityCreateInput<K>): Promise<T> {
    return this.service.createOne(createDto);
  }

  @Get()
  async findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
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
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      where,
      include,
      select,
    });
  }

  @Get('find')
  async findOne(
    @Query('ids') idsStr: string,
    @Query('include') includeStr?: string,
    @Query('select') selectStr?: string,
  ): Promise<T> {
    const ids = this.parseIds(idsStr);
    const include = this.parseInclude(includeStr);
    const select = this.parseSelect(selectStr);
    if (include && select)
      throw new BadRequestException('唔可以同時用 include 同 select');
    return this.service.findOne(ids, include, select);
  }

  @Patch('update')
  async update(
    @Query('ids') idsStr: string,
    @Body() updateDto: EntityUpdateInput<K>,
  ): Promise<T> {
    const ids = this.parseIds(idsStr);
    return this.service.updateOne(ids, updateDto);
  }

  @Delete('delete')
  async remove(@Query('ids') idsStr: string): Promise<T> {
    const ids = this.parseIds(idsStr);
    return this.service.deleteOne(ids);
  }

  protected parseIds(idsStr: string): { [key: string]: number } {
    if (!idsStr) throw new BadRequestException('ids 參數係必須嘅');
    try {
      return JSON.parse(idsStr) as { [key: string]: number };
    } catch (error) {
      throw new BadRequestException('無效嘅 ids 參數');
    }
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
      throw new BadRequestException('無效嘅 where 參數');
    }
  }
}

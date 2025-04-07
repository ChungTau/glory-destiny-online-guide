// apps/api/src/features/geography/nation/nation.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { NationService } from './nation.service';
import { NationCreateDto } from './dto/nation-create.dto';
import { NationUpdateDto } from './dto/nation-update.dto';
import { NationInclude, Nation } from '@glory-destiny-online-guide/prisma';
import { PaginatedResult } from 'src/core/base.service';
import { PaginatedQueryParams } from 'src/common/dto/query-params.dto';

@Controller('nations')
export class NationController {
  constructor(private readonly nationService: NationService) {}

  // 創建一個新 Nation
  @Post()
  async create(@Body() createDto: NationCreateDto): Promise<Nation> {
    return this.nationService.createOne(createDto);
  }

  // 分頁查詢所有 Nation，可選帶 areas 關聯
  @Get()
  async findAll(
    @Query() query: PaginatedQueryParams,
    @Query('includeAreas') includeAreas?: string,
  ): Promise<PaginatedResult<Nation>> {
    const include: NationInclude = { areas: includeAreas === 'true' }; // 直接設為 { areas: true } 或 { areas: false }
    return this.nationService.findManyPaginatedWithInclude(query, include);
  }

  // 查詢單個 Nation，可選帶 areas 關聯
  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query('includeAreas') includeAreas?: string,
  ): Promise<Nation> {
    const include: NationInclude = { areas: includeAreas === 'true' }; // 同上
    return this.nationService.findOneWithInclude(+id, include);
  }

  // 更新單個 Nation
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: NationUpdateDto,
  ): Promise<Nation> {
    return this.nationService.updateOne(+id, updateDto);
  }

  // 刪除單個 Nation
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Nation> {
    return this.nationService.remove(+id);
  }
}

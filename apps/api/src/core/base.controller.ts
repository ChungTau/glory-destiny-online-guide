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
  import { BaseService, PaginatedResult, Identifiable } from './base.service';
  import { PaginatedQueryParams } from '../common/dto/query-params.dto';
  import { Prisma } from '@glory-destiny-online-guide/prisma';
  
  // T: 實體類型 (e.g., Nation)
  // K: Prisma 模型名稱 (e.g., Prisma.ModelName.Nation)
  // C: Create DTO
  // U: Update DTO
  // I: Include 類型 (e.g., NationInclude)
  @Controller()
  export abstract class BaseController<
    T extends Identifiable,
    W extends Identifiable,
    K extends Prisma.ModelName,
    C = any,
    U = any,
    I = any,
  > {
    protected abstract readonly service: BaseService<T, W, K, C, U, I>;
  
    // 創建單個實體
    @Post()
    async create(@Body() createDto: C): Promise<T> {
      return this.service.createOne(createDto);
    }
  
    // 分頁查詢，支持動態 include
    @Get()
    async findAll(
      @Query() query: PaginatedQueryParams,
      @Query('include') includeStr?: string,
    ): Promise<PaginatedResult<T|W>> {
      const include = this.parseInclude(includeStr); // 解析 include 參數
      return this.service.findManyPaginated({ ...query, include });
    }
  
    // 查詢單個實體，支持動態 include
    @Get(':id')
    async findOne(
      @Param('id') id: string,
      @Query('include') includeStr?: string,
    ): Promise<T|W> {
      const include = this.parseInclude(includeStr);
      return this.service.findOne(+id, include);
    }
  
    // 更新單個實體
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateDto: U): Promise<T> {
      return this.service.updateOne(+id, updateDto);
    }
  
    // 刪除單個實體
    @Delete(':id')
    async remove(@Param('id') id: string): Promise<T> {
      return this.service.remove(+id);
    }
  
    // 解析 include 查詢參數（子類可覆蓋）
    protected parseInclude(includeStr?: string): I | undefined {
      if (!includeStr) return undefined;
      try {
        return JSON.parse(includeStr) as I; // 假設 include 係 JSON 格式，例如 {"areas": true}
      } catch (error) {
        throw new BadRequestException('無效嘅 include 參數');
      }
    }
  }
// apps/api/src/features/geography/nation/nation.controller.ts
import { Controller } from '@nestjs/common';
import { AreaService } from './area.service';
import { AreaCreateDto } from './dto/area-create.dto';
import { AreaUpdateDto } from './dto/area-update.dto';
import { Area, AreaInclude, Prisma } from '@glory-destiny-online-guide/prisma';
import { BaseController } from 'src/core/base.controller';
import { AreaResponseDto } from './dto/area-response.dto';

@Controller('areas')
export class AreaController extends BaseController<
  Area,
  AreaResponseDto,
  typeof Prisma.ModelName.Area,
  AreaCreateDto,
  AreaUpdateDto,
  AreaInclude
> {
  protected readonly service: AreaService; // 只聲明類型，唔賦值

  constructor(private readonly areaService: AreaService) {
    super();
    this.service = this.areaService; // 喺 constructor 入面賦值
  }
}
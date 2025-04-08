// apps/api/src/features/geography/nation/nation.controller.ts
import { Controller } from '@nestjs/common';
import { NationService } from './nation.service';
import { NationCreateDto } from './dto/nation-create.dto';
import { NationUpdateDto } from './dto/nation-update.dto';
import { Nation, NationInclude, Prisma } from '@glory-destiny-online-guide/prisma';
import { BaseController } from 'src/core/base.controller';
import { NationResponseDto } from './dto/nation-response.dto';

@Controller('nations')
export class NationController extends BaseController<
  Nation,
  NationResponseDto,
  typeof Prisma.ModelName.Nation,
  NationCreateDto,
  NationUpdateDto,
  NationInclude
> {
  protected readonly service: NationService; // 只聲明類型，唔賦值

  constructor(private readonly nationService: NationService) {
    super();
    this.service = this.nationService; // 喺 constructor 入面賦值
  }
}
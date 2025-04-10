// apps/api/src/features/item/obtain-method/obtain-method.controller.ts
import { Controller, Inject } from '@nestjs/common';
import { BaseController } from 'src/core/base/base.controller';
import { Prisma } from '@glory-destiny-online-guide/prisma';
import { EntityPayloadWithInclude } from 'src/common/types/prisma.types';

@Controller('obtain-methods')
export class ObtainMethodController extends BaseController<
  EntityPayloadWithInclude<
    typeof Prisma.ModelName.ObtainMethod,
    Prisma.ObtainMethodInclude
  >,
  typeof Prisma.ModelName.ObtainMethod,
  Prisma.ObtainMethodInclude,
  Prisma.ObtainMethodSelect
> {
  constructor(
    @Inject(`${Prisma.ModelName.ObtainMethod}Service`)
    protected readonly service: any, // 用動態生成嘅 Service
  ) {
    super();
  }
}

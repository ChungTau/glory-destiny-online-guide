// apps/api/src/features/item/tool-detail/tool-detail.controller.ts
import { Controller, Inject } from '@nestjs/common';
import { BaseController } from 'src/core/base/base.controller';
import { Prisma } from '@glory-destiny-online-guide/prisma';
import { EntityPayloadWithInclude } from 'src/common/types/prisma.types';

@Controller('tool-details')
export class ToolDetailController extends BaseController<
  EntityPayloadWithInclude<
    typeof Prisma.ModelName.ToolDetail,
    Prisma.ToolDetailInclude
  >,
  typeof Prisma.ModelName.ToolDetail,
  Prisma.ToolDetailInclude,
  Prisma.ToolDetailSelect
> {
  constructor(
    @Inject(`${Prisma.ModelName.ToolDetail}Service`)
    protected readonly service: any // 用動態生成嘅 Service
  ) {
    super();
  }
}

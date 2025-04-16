// apps/api/src/features/admin/nav-item/nav-item.controller.ts
import { Controller, Inject } from '@nestjs/common';
import { BaseController } from 'src/core/base/base.controller';
import { Prisma } from '@glory-destiny-online-guide/prisma';
import { EntityPayloadWithInclude } from 'src/common/types/prisma.types';

@Controller('nav-items')
export class NavItemController extends BaseController<
  EntityPayloadWithInclude<
    typeof Prisma.ModelName.NavItem,
    Prisma.NavItemInclude
  >,
  typeof Prisma.ModelName.NavItem,
  Prisma.NavItemInclude,
  Prisma.NavItemSelect
> {
  constructor(
    @Inject(`${Prisma.ModelName.NavItem}Service`)
    protected readonly service: any // 用動態生成嘅 Service
  ) {
    super();
  }
}

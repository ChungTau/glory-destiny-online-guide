// apps/api/src/features/item/pet-egg-detail/pet-egg-detail.controller.ts
import { Controller, Inject } from '@nestjs/common';
import { BaseController } from 'src/core/base/base.controller';
import { Prisma } from '@glory-destiny-online-guide/prisma';
import { EntityPayloadWithInclude } from 'src/common/types/prisma.types';

@Controller('pet-egg-details')
export class PetEggDetailController extends BaseController<
  EntityPayloadWithInclude<
    typeof Prisma.ModelName.PetEggDetail,
    Prisma.PetEggDetailInclude
  >,
  typeof Prisma.ModelName.PetEggDetail,
  Prisma.PetEggDetailInclude,
  Prisma.PetEggDetailSelect
> {
  constructor(
    @Inject(`${Prisma.ModelName.PetEggDetail}Service`)
    protected readonly service: any // 用動態生成嘅 Service
  ) {
    super();
  }
}

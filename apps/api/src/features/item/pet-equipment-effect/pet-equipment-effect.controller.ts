// apps/api/src/features/item/pet-equipment-effect/pet-equipment-effect.controller.ts
import { Controller, Inject } from '@nestjs/common';
import { BaseController } from 'src/core/base/base.controller';
import { Prisma } from '@glory-destiny-online-guide/prisma';
import { EntityPayloadWithInclude } from 'src/common/types/prisma.types';

@Controller('pet-equipment-effects')
export class PetEquipmentEffectController extends BaseController<
  EntityPayloadWithInclude<
    typeof Prisma.ModelName.PetEquipmentEffect,
    Prisma.PetEquipmentEffectInclude
  >,
  typeof Prisma.ModelName.PetEquipmentEffect,
  Prisma.PetEquipmentEffectInclude,
  Prisma.PetEquipmentEffectSelect
> {
  constructor(
    @Inject(`${Prisma.ModelName.PetEquipmentEffect}Service`)
    protected readonly service: any, // 用動態生成嘅 Service
  ) {
    super();
  }
}

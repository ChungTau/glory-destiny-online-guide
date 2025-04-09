// apps/api/src/features/item/pet-equipment-effect/pet-equipment-effect.module.ts
import { Module } from '@nestjs/common';
import { PetEquipmentEffectController } from './pet-equipment-effect.controller';
import { CustomPetEquipmentEffectService } from './pet-equipment-effect.service'; // 自定義服務改名
import { provideBaseService, BaseModule } from 'src/core/base';
import { Prisma } from '@glory-destiny-online-guide/prisma';

@Module({
  imports: [BaseModule],
  controllers: [PetEquipmentEffectController],
  providers: [
    CustomPetEquipmentEffectService,
    provideBaseService(Prisma.ModelName.PetEquipmentEffect),
  ],
})
export class PetEquipmentEffectModule {}

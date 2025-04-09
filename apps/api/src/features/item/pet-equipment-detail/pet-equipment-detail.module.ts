// apps/api/src/features/item/pet-equipment-detail/pet-equipment-detail.module.ts
import { Module } from '@nestjs/common';
import { PetEquipmentDetailController } from './pet-equipment-detail.controller';
import { CustomPetEquipmentDetailService } from './pet-equipment-detail.service'; // 自定義服務改名
import { provideBaseService, BaseModule } from 'src/core/base';
import { Prisma } from '@glory-destiny-online-guide/prisma';

@Module({
  imports: [BaseModule],
  controllers: [PetEquipmentDetailController],
  providers: [
    CustomPetEquipmentDetailService,
    provideBaseService(Prisma.ModelName.PetEquipmentDetail),
  ],
})
export class PetEquipmentDetailModule {}

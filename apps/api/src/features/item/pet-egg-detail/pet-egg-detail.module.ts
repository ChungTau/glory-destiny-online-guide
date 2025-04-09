// apps/api/src/features/item/pet-egg-detail/pet-egg-detail.module.ts
import { Module } from '@nestjs/common';
import { PetEggDetailController } from './pet-egg-detail.controller';
import { CustomPetEggDetailService } from './pet-egg-detail.service'; // 自定義服務改名
import { provideBaseService, BaseModule } from 'src/core/base';
import { Prisma } from '@glory-destiny-online-guide/prisma';

@Module({
  imports: [BaseModule],
  controllers: [PetEggDetailController],
  providers: [
    CustomPetEggDetailService,
    provideBaseService(Prisma.ModelName.PetEggDetail),
  ],
})
export class PetEggDetailModule {}

// apps/api/src/features/item/weapon-detail/weapon-detail.module.ts
import { Module } from '@nestjs/common';
import { WeaponDetailController } from './weapon-detail.controller';
import { CustomWeaponDetailService } from './weapon-detail.service'; // 自定義服務改名
import { provideBaseService, BaseModule } from 'src/core/base';
import { Prisma } from '@glory-destiny-online-guide/prisma';

@Module({
  imports: [BaseModule],
  controllers: [WeaponDetailController],
  providers: [
    CustomWeaponDetailService,
    provideBaseService(Prisma.ModelName.WeaponDetail),
  ],
})
export class WeaponDetailModule {}

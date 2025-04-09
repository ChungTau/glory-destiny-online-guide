// apps/api/src/features/item/armor-set-bonus/armor-set-bonus.module.ts
import { Module } from '@nestjs/common';
import { ArmorSetBonusController } from './armor-set-bonus.controller';
import { CustomArmorSetBonusService } from './armor-set-bonus.service'; // 自定義服務改名
import { provideBaseService, BaseModule } from 'src/core/base';
import { Prisma } from '@glory-destiny-online-guide/prisma';

@Module({
  imports: [BaseModule],
  controllers: [ArmorSetBonusController],
  providers: [
    CustomArmorSetBonusService,
    provideBaseService(Prisma.ModelName.ArmorSetBonus),
  ],
})
export class ArmorSetBonusModule {}

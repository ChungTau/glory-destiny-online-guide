// apps/api/src/features/item/armor-set/armor-set.module.ts
import { Module } from '@nestjs/common';
import { ArmorSetController } from './armor-set.controller';
import { CustomArmorSetService } from './armor-set.service'; // 自定義服務改名
import { provideBaseService, BaseModule } from 'src/core/base';
import { Prisma } from '@glory-destiny-online-guide/prisma';

@Module({
  imports: [BaseModule],
  controllers: [ArmorSetController],
  providers: [
    CustomArmorSetService,
    provideBaseService(Prisma.ModelName.ArmorSet),
  ],
})
export class ArmorSetModule {}

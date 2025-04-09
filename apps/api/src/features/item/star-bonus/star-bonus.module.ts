// apps/api/src/features/item/star-bonus/star-bonus.module.ts
import { Module } from '@nestjs/common';
import { StarBonusController } from './star-bonus.controller';
import { CustomStarBonusService } from './star-bonus.service'; // 自定義服務改名
import { provideBaseService, BaseModule } from 'src/core/base';
import { Prisma } from '@glory-destiny-online-guide/prisma';

@Module({
  imports: [BaseModule],
  controllers: [StarBonusController],
  providers: [
    CustomStarBonusService,
    provideBaseService(Prisma.ModelName.StarBonus),
  ],
})
export class StarBonusModule {}

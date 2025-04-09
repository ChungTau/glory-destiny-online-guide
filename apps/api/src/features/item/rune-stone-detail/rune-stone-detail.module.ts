// apps/api/src/features/item/rune-stone-detail/rune-stone-detail.module.ts
import { Module } from '@nestjs/common';
import { RuneStoneDetailController } from './rune-stone-detail.controller';
import { CustomRuneStoneDetailService } from './rune-stone-detail.service'; // 自定義服務改名
import { provideBaseService, BaseModule } from 'src/core/base';
import { Prisma } from '@glory-destiny-online-guide/prisma';

@Module({
  imports: [BaseModule],
  controllers: [RuneStoneDetailController],
  providers: [
    CustomRuneStoneDetailService,
    provideBaseService(Prisma.ModelName.RuneStoneDetail),
  ],
})
export class RuneStoneDetailModule {}

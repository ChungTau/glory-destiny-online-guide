// apps/api/src/features/geography/nation/nation.module.ts
import { Module } from '@nestjs/common';
import { NationController } from './nation.controller';
import { CustomNationService } from './nation.service'; // 自定義服務改名
import { provideBaseService, BaseModule } from 'src/core/base';
import { Prisma } from '@glory-destiny-online-guide/prisma';

@Module({
  imports: [BaseModule],
  controllers: [NationController],
  providers: [CustomNationService, provideBaseService(Prisma.ModelName.Nation)],
})
export class NationModule {}
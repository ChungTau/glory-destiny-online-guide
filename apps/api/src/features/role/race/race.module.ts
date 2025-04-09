// apps/api/src/features/geography/race/race.module.ts
import { Module } from '@nestjs/common';
import { RaceController } from './race.controller';
import { CustomRaceService } from './race.service'; // 自定義服務改名
import { BaseModule } from 'src/core/base.module';
import { provideBaseService } from 'src/core/base.utils';
import { Prisma } from '@glory-destiny-online-guide/prisma';

@Module({
  imports: [BaseModule],
  controllers: [RaceController],
  providers: [
    CustomRaceService,
    provideBaseService(Prisma.ModelName.Race)
  ],
})
export class RaceModule {}
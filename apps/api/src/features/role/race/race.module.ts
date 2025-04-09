// apps/api/src/features/geography/race/race.module.ts
import { Module } from '@nestjs/common';
import { RaceController } from './race.controller';
import { RaceService } from './race.service';
import { BaseModule } from 'src/core/base.module';
import { Prisma } from '@glory-destiny-online-guide/prisma';

@Module({
  imports: [BaseModule.forEntity(Prisma.ModelName.Race, [RaceService])],
  controllers: [RaceController],
  providers: [RaceService,],
})
export class RaceModule {}
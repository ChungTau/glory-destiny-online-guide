// apps/api/src/features/geography/dungeon/dungeon.module.ts
import { Module } from '@nestjs/common';
import { DungeonController } from './dungeon.controller';
import { CustomDungeonService } from './dungeon.service'; // 自定義服務改名
import { provideBaseService, BaseModule } from 'src/core/base';
import { Prisma } from '@glory-destiny-online-guide/prisma';

@Module({
  imports: [BaseModule],
  controllers: [DungeonController],
  providers: [
    CustomDungeonService,
    provideBaseService(Prisma.ModelName.Dungeon),
  ],
})
export class DungeonModule {}

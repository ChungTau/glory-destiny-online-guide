// apps/api/src/features/geography/dungeonMonster/dungeonMonster.module.ts
import { Module } from '@nestjs/common';
import { DungeonMonsterController } from './dungeon-monster.controller';
import { CustomDungeonMonsterService } from './dungeon-monster.service'; // 自定義服務改名
import { provideBaseService, BaseModule } from 'src/core/base';
import { Prisma } from '@glory-destiny-online-guide/prisma';

@Module({
  imports: [BaseModule],
  controllers: [DungeonMonsterController],
  providers: [
    CustomDungeonMonsterService,
    provideBaseService(Prisma.ModelName.DungeonMonster)
  ],
})
export class DungeonMonsterModule {}
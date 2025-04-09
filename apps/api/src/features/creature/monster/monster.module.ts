// apps/api/src/features/geography/monster/monster.module.ts
import { Module } from '@nestjs/common';
import { MonsterController } from './monster.controller';
import { CustomMonsterService } from './monster.service'; // 自定義服務改名
import { provideBaseService, BaseModule } from 'src/core/base';
import { Prisma } from '@glory-destiny-online-guide/prisma';

@Module({
  imports: [BaseModule],
  controllers: [MonsterController],
  providers: [
    CustomMonsterService,
    provideBaseService(Prisma.ModelName.Monster)
  ],
})
export class MonsterModule {}
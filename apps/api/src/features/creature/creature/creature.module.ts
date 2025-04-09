// apps/api/src/features/geography/creature/creature.module.ts
import { Module } from '@nestjs/common';
import { CreatureController } from './creature.controller';
import { CustomCreatureService } from './creature.service'; // 自定義服務改名
import { provideBaseService, BaseModule } from 'src/core/base';
import { Prisma } from '@glory-destiny-online-guide/prisma';

@Module({
  imports: [BaseModule],
  controllers: [CreatureController],
  providers: [
    CustomCreatureService,
    provideBaseService(Prisma.ModelName.Creature)
  ],
})
export class CreatureModule {}
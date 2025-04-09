// apps/api/src/features/creature/creature.module.ts
import { Module } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';
import { MonsterModule } from './monster/monster.module';
import { PetModule } from './pet/pet.module';
import { CreatureModule as CModule } from './creature/creature.module';

@Module({
  imports: [CoreModule, CModule, MonsterModule, PetModule],
  exports: [CModule, MonsterModule, PetModule],
})
export class CreatureModule {}
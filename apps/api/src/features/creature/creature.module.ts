// apps/api/src/features/creature/creature.module.ts
import { Module } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';
import { MonsterModule } from './monster/monster.module';
import { PetModule } from './pet/pet.module';
import { CreatureModule as CModule } from './creature/creature.module';
import { DungeonMonsterModule } from './dungeon-monster/dungeon-monster.module';
import { PetAttributeModule } from './pet-attribute/pet-attribute.module';

@Module({
  imports: [
    CoreModule,
    CModule,
    MonsterModule,
    PetModule,
    DungeonMonsterModule,
    PetAttributeModule,
  ],
  exports: [
    CModule,
    MonsterModule,
    PetModule,
    DungeonMonsterModule,
    PetAttributeModule,
  ],
})
export class CreatureModule {}
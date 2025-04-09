// apps/api/src/features/feature.module.ts
import { Module } from '@nestjs/common';
import { GeographyModule } from './geography/geography.module';
import { RoleModule } from './role/role.module';
import { CoreModule } from 'src/core/core.module';
import { CreatureModule } from './creature/creature.module';
import { QuestModule } from './quest/quest.module';
import { ItemModule } from './item/item.module';
import { SkillModule } from './skill/skill.module';

@Module({
  imports: [
    CoreModule,
    GeographyModule,
    RoleModule,
    CreatureModule,
    QuestModule,
    ItemModule,
    SkillModule,
  ],
  exports: [
    GeographyModule,
    RoleModule,
    CreatureModule,
    QuestModule,
    ItemModule,
    SkillModule,
  ],
})
export class FeatureModule {}

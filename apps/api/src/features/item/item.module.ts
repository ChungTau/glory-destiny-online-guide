// apps/api/src/features/item/item.module.ts
import { Module } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';
import { AccessoryDetailModule } from './accessory-detail/accessory-detail.module';
import { ArmorDetailModule } from './armor-detail/armor-detail.module';
import { ArmorSetModule } from './armor-set/armor-set.module';
import { ArmorSetBonusModule } from './armor-set-bonus/armor-set-bonus.module';
import { CollectionDetailModule } from './collection-detail/collection-detail.module';
import { CostumeDetailModule } from './costume-detail/costume-detail.module';
import { EnhancementDetailModule } from './enhancement-detail/enhancement-detail.module';
import { ItemModule as IModule } from './item/item.module';
import { ItemAttributeModule } from './item-attribute/item-attribute.module';
import { ItemObtainMethodModule } from './item-obtain-method/item-obtain-method.module';
import { MaterialDetailModule } from './material-detail/material-detail.module';
import { MonsterDropModule } from './monster-drop/monster-drop.module';
import { ObtainMethodModule } from './obtain-method/obtain-method.module';
import { PetEggDetailModule } from './pet-egg-detail/pet-egg-detail.module';
import { PetEquipmentDetailModule } from './pet-equipment-detail/pet-equipment-detail.module';
import { PetEquipmentEffectModule } from './pet-equipment-effect/pet-equipment-effect.module';
import { QuestItemDetailModule } from './quest-item-detail/quest-item-detail.module';
import { RuneStoneDetailModule } from './rune-stone-detail/rune-stone-detail.module';
import { StarBonusModule } from './star-bonus/star-bonus.module';
import { ToolDetailModule } from './tool-detail/tool-detail.module';
import { WeaponDetailModule } from './weapon-detail/weapon-detail.module';
import { QuestRewardItemModule } from './quest-reward-item/quest-reward-item.module';

@Module({
  imports: [
    CoreModule,
    AccessoryDetailModule,
    ArmorDetailModule,
    ArmorSetModule,
    ArmorSetBonusModule,
    CollectionDetailModule,
    CostumeDetailModule,
    EnhancementDetailModule,
    IModule,
    ItemAttributeModule,
    ItemObtainMethodModule,
    MaterialDetailModule,
    MonsterDropModule,
    ObtainMethodModule,
    PetEggDetailModule,
    PetEquipmentDetailModule,
    PetEquipmentEffectModule,
    QuestItemDetailModule,
    QuestRewardItemModule,
    RuneStoneDetailModule,
    StarBonusModule,
    ToolDetailModule,
    WeaponDetailModule,
  ],
  exports: [
    AccessoryDetailModule,
    ArmorDetailModule,
    ArmorSetModule,
    ArmorSetBonusModule,
    CollectionDetailModule,
    CostumeDetailModule,
    EnhancementDetailModule,
    IModule,
    ItemAttributeModule,
    ItemObtainMethodModule,
    MaterialDetailModule,
    MonsterDropModule,
    ObtainMethodModule,
    PetEggDetailModule,
    PetEquipmentDetailModule,
    PetEquipmentEffectModule,
    QuestItemDetailModule,
    QuestRewardItemModule,
    RuneStoneDetailModule,
    StarBonusModule,
    ToolDetailModule,
    WeaponDetailModule,
  ],
})
export class ItemModule {}

-- CreateEnum
CREATE TYPE "AccessoryType" AS ENUM ('RING', 'ARTIFACT', 'ARTIFACT_A', 'ARTIFACT_E', 'ARTIFACT_G', 'ARTIFACT_M', 'NECKLACE', 'BADGE');

-- CreateEnum
CREATE TYPE "ArmorSlot" AS ENUM ('HEAD', 'BODY', 'WAIST', 'HANDS', 'FEET');

-- CreateEnum
CREATE TYPE "ArmorType" AS ENUM ('HEAVY_ARMOR', 'LIGHT_ARMOR');

-- CreateEnum
CREATE TYPE "AttackMode" AS ENUM ('ACTIVE', 'PASSIVE');

-- CreateEnum
CREATE TYPE "AttackType" AS ENUM ('PHYSICAL', 'FIRE', 'FROST', 'HOLY', 'WIND', 'THUNDER');

-- CreateEnum
CREATE TYPE "Attribute" AS ENUM ('PHYSICAL', 'FIRE', 'FROST', 'HOLY', 'WIND', 'THUNDER', 'ATTACK', 'DEFENSE', 'HP', 'MP', 'MOVE_SPEED', 'STRENGTH', 'AGILITY', 'SPIRIT', 'INTELLIGENCE', 'LUCK', 'DODGE', 'CRITICAL', 'CRITICAL_PHYSICAL', 'CRITICAL_SPELL', 'RESISTANCE', 'HIT_RATE', 'ATTACK_SPEED', 'SPELL_SPEED', 'BLOCK', 'HEALING_RECEIVED', 'DAMAGE_DEALT', 'DAMAGE_TAKEN', 'CRITICAL_DAMAGE_REDUCTION', 'THREAT', 'HEALING_AMOUNT', 'CRITICAL_DAMAGE', 'FIRE_RESISTANCE', 'FROST_RESISTANCE', 'WIND_RESISTANCE', 'THUNDER_RESISTANCE', 'SHADOW_RESISTANCE');

-- CreateEnum
CREATE TYPE "BodyType" AS ENUM ('ATTACK', 'DEFENSE', 'NORMAL', 'HEALTH');

-- CreateEnum
CREATE TYPE "CostumeSlot" AS ENUM ('HEAD', 'FACE', 'BODY', 'BACK', 'WEAPON');

-- CreateEnum
CREATE TYPE "EffectType" AS ENUM ('DAMAGE', 'DAMAGE_OVER_TIME', 'HEAL', 'HEAL_OVER_TIME', 'RESURRECTION', 'BUFF', 'DEBUFF', 'SHIELD', 'REFLECT_DAMAGE', 'STAT_BOOST', 'CROWD_CONTROL', 'SILENCE', 'COOLDOWN_REDUCTION', 'TRANSFORMATION', 'TAUNT', 'DAMAGE_REDUCTION', 'KNOCK_UP', 'KNOCKBACK', 'CLEANSE', 'SUMMON', 'MULTI_HIT', 'DASH', 'CONDITIONAL_EFFECT', 'STACKABLE_EFFECT', 'TOGGLE');

-- CreateEnum
CREATE TYPE "Faction" AS ENUM ('WARRIOR', 'ASSASSIN', 'TAOIST', 'ONMYOJI', 'MYSTIC', 'ARCHER', 'HUNTER', 'STRONGMAN', 'GUARDIAN', 'CELESTIAL');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "ItemObtainType" AS ENUM ('DROPPED', 'QUEST', 'CHEST', 'REPUTATION', 'PURCHASE', 'CRAFTING');

-- CreateEnum
CREATE TYPE "ItemQuality" AS ENUM ('WHITE', 'GREEN', 'BLUE', 'PURPLE', 'GOLD');

-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('WEAPON', 'ARMOR', 'ACCESSORY', 'COSTUME', 'PET_EQUIPMENT', 'PET_EGG', 'MATERIAL', 'ENHANCEMENT', 'TOOL', 'QUEST_ITEM', 'COLLECTION', 'RUNE_STONE');

-- CreateEnum
CREATE TYPE "JobStage" AS ENUM ('FIRST', 'SECOND', 'THIRD');

-- CreateEnum
CREATE TYPE "MaterialType" AS ENUM ('GEM', 'WOOD', 'CORE', 'SPECIAL', 'FUR', 'STONE', 'COIN', 'RUNE', 'METAL');

-- CreateEnum
CREATE TYPE "MonsterStage" AS ENUM ('NORMAL', 'ELITE', 'BOSS', 'COLOSSI');

-- CreateEnum
CREATE TYPE "PetEquipmentType" AS ENUM ('WEAPON', 'ARMOR', 'HELMET', 'NECKLACE', 'RING', 'TOOL');

-- CreateEnum
CREATE TYPE "PetObtainType" AS ENUM ('SPECIAL_EVENT', 'QUEST', 'GACHA', 'PET_DUMPLING', 'DUNGEON');

-- CreateEnum
CREATE TYPE "PetSkillCategory" AS ENUM ('COMBAT', 'FUSION');

-- CreateEnum
CREATE TYPE "SkillType" AS ENUM ('ACTIVE', 'PASSIVE');

-- CreateEnum
CREATE TYPE "Target" AS ENUM ('SINGLE_TARGET', 'AREA_OF_EFFECT', 'SELF', 'ALLIES', 'SELF_AND_ALLIES', 'ENEMIES', 'LINE', 'DUAL_LINE', 'CONE', 'CROSS', 'DEAD_ALLIES', 'SUMMONED_UNIT', 'SELF_CENTERED_AOE');

-- CreateEnum
CREATE TYPE "ToolType" AS ENUM ('FARM', 'ARENA', 'RUNE_CLOTH', 'CAPSULE', 'POTION', 'FISHING');

-- CreateEnum
CREATE TYPE "UnitType" AS ENUM ('PERCENT', 'POINTS');

-- CreateEnum
CREATE TYPE "WeaponType" AS ENUM ('DAGGER', 'KNUCKLE', 'ONE_HAND_SWORD', 'ONE_HAND_STAFF', 'HAMMER', 'KATANA', 'BOW', 'CROSSBOW', 'POLEARM', 'TWO_HAND_STAFF');

-- CreateTable
CREATE TABLE "AccessoryDetail" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "accessoryType" "AccessoryType" NOT NULL,

    CONSTRAINT "AccessoryDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Area" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nationId" INTEGER NOT NULL,

    CONSTRAINT "Area_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArmorDetail" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "armorType" "ArmorType" NOT NULL,
    "armorSlot" "ArmorSlot" NOT NULL,
    "isSet" BOOLEAN NOT NULL DEFAULT false,
    "setId" INTEGER,

    CONSTRAINT "ArmorDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArmorSet" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "ArmorSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArmorSetBonus" (
    "id" SERIAL NOT NULL,
    "setId" INTEGER NOT NULL,
    "requiredPieces" INTEGER NOT NULL,
    "attribute" "Attribute" NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "unit" "UnitType",

    CONSTRAINT "ArmorSetBonus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CollectionDetail" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "nationId" INTEGER NOT NULL,
    "setId" INTEGER,

    CONSTRAINT "CollectionDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CostumeDetail" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "costumeSlot" "CostumeSlot" NOT NULL,
    "gender" "Gender" NOT NULL,
    "duration" INTEGER,
    "maxHealthIncrease" DOUBLE PRECISION,
    "physicalCritRateIncrease" DOUBLE PRECISION,
    "magicCritRateIncrease" DOUBLE PRECISION,
    "allResistanceIncrease" DOUBLE PRECISION,
    "physicalCritDamageIncrease" DOUBLE PRECISION,
    "magicCritDamageIncrease" DOUBLE PRECISION,
    "attackPowerIncrease" DOUBLE PRECISION,
    "healingAmountIncrease" DOUBLE PRECISION,

    CONSTRAINT "CostumeDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Creature" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "areaId" INTEGER,
    "attackType" "AttackType" NOT NULL,
    "bodyType" "BodyType" NOT NULL,
    "description" TEXT,

    CONSTRAINT "Creature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dungeon" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "requiredLevel" INTEGER NOT NULL,
    "areaId" INTEGER NOT NULL,
    "maxParticipants" INTEGER NOT NULL,

    CONSTRAINT "Dungeon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DungeonMonster" (
    "id" SERIAL NOT NULL,
    "dungeonId" INTEGER NOT NULL,
    "monsterId" INTEGER NOT NULL,

    CONSTRAINT "DungeonMonster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EnhancementDetail" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "minLevel" INTEGER NOT NULL,
    "maxLevel" INTEGER NOT NULL,

    CONSTRAINT "EnhancementDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "iconUrl" TEXT,
    "type" "ItemType" NOT NULL,
    "quality" "ItemQuality" NOT NULL DEFAULT 'WHITE',
    "stackable" BOOLEAN NOT NULL DEFAULT false,
    "tradeable" BOOLEAN NOT NULL DEFAULT true,
    "sellable" BOOLEAN NOT NULL DEFAULT true,
    "price" INTEGER NOT NULL DEFAULT 0,
    "requiredLevel" INTEGER NOT NULL,
    "durability" INTEGER NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemAttribute" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "attribute" "Attribute" NOT NULL,
    "baseValue" DOUBLE PRECISION,
    "unit" "UnitType",

    CONSTRAINT "ItemAttribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemObtainMethod" (
    "itemId" INTEGER NOT NULL,
    "obtainMethodId" INTEGER NOT NULL,
    "probability" DOUBLE PRECISION,
    "minLevel" INTEGER,
    "maxQuantity" INTEGER,

    CONSTRAINT "ItemObtainMethod_pkey" PRIMARY KEY ("itemId","obtainMethodId")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "faction" "Faction" NOT NULL,
    "stage" "JobStage" NOT NULL,
    "minPromotionLevel" INTEGER,
    "iconUrl" TEXT,
    "raceId" INTEGER NOT NULL,
    "parentJobId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobSkill" (
    "jobId" INTEGER NOT NULL,
    "skillId" INTEGER NOT NULL,

    CONSTRAINT "JobSkill_pkey" PRIMARY KEY ("jobId","skillId")
);

-- CreateTable
CREATE TABLE "MaterialDetail" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "type" "MaterialType" NOT NULL,

    CONSTRAINT "MaterialDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Monster" (
    "id" SERIAL NOT NULL,
    "creatureId" INTEGER NOT NULL,
    "attackMode" "AttackMode" NOT NULL,
    "monsterStage" "MonsterStage" NOT NULL,
    "canCapture" BOOLEAN NOT NULL DEFAULT true,
    "petEggId" INTEGER,

    CONSTRAINT "Monster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MonsterDrop" (
    "monsterId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    "requiresBreak" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "MonsterDrop_pkey" PRIMARY KEY ("monsterId","itemId")
);

-- CreateTable
CREATE TABLE "Nation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Nation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ObtainMethod" (
    "id" SERIAL NOT NULL,
    "type" "ItemObtainType" NOT NULL,
    "description" TEXT,
    "areaId" INTEGER,

    CONSTRAINT "ObtainMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pet" (
    "id" SERIAL NOT NULL,
    "creatureId" INTEGER NOT NULL,
    "obtainType" "PetObtainType" NOT NULL,
    "obtainWay" TEXT,
    "bodyType" "BodyType" NOT NULL,
    "quality" "ItemQuality" NOT NULL,
    "petEggId" INTEGER NOT NULL,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetAttribute" (
    "id" SERIAL NOT NULL,
    "petId" INTEGER NOT NULL,
    "attribute" "Attribute" NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "unit" "UnitType",

    CONSTRAINT "PetAttribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetEggDetail" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "petId" INTEGER NOT NULL,

    CONSTRAINT "PetEggDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetEquipmentDetail" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "equipType" "PetEquipmentType" NOT NULL,
    "requiredLevel" INTEGER NOT NULL,

    CONSTRAINT "PetEquipmentDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetEquipmentEffect" (
    "id" SERIAL NOT NULL,
    "effectType" "EffectType" NOT NULL,
    "target" "Target",
    "attribute" "Attribute",
    "baseValue" DOUBLE PRECISION,
    "unit" "UnitType",
    "chance" DOUBLE PRECISION,
    "duration" DOUBLE PRECISION,
    "interval" DOUBLE PRECISION,
    "stackLimit" INTEGER,

    CONSTRAINT "PetEquipmentEffect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetSkill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "skillType" "SkillType" NOT NULL,
    "skillCategory" "PetSkillCategory" NOT NULL,

    CONSTRAINT "PetSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetSkillLink" (
    "petId" INTEGER NOT NULL,
    "petSkillId" INTEGER NOT NULL,

    CONSTRAINT "PetSkillLink_pkey" PRIMARY KEY ("petId","petSkillId")
);

-- CreateTable
CREATE TABLE "Quest" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "requiredLevel" INTEGER,
    "rewardExp" INTEGER,
    "rewardMoney" INTEGER,
    "timeLimit" INTEGER,
    "triggerItemId" INTEGER,
    "giverNpcId" INTEGER,
    "receiverNpcId" INTEGER,
    "isRepeatable" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Quest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestItemDetail" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "questId" INTEGER NOT NULL,
    "isKey" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "QuestItemDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestPrerequisite" (
    "questId" INTEGER NOT NULL,
    "prerequisiteId" INTEGER NOT NULL,

    CONSTRAINT "QuestPrerequisite_pkey" PRIMARY KEY ("questId","prerequisiteId")
);

-- CreateTable
CREATE TABLE "QuestRewardItem" (
    "questId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "QuestRewardItem_pkey" PRIMARY KEY ("questId","itemId")
);

-- CreateTable
CREATE TABLE "Race" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Race_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RuneStoneDetail" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "slot" "ArmorSlot" NOT NULL,
    "stats" JSONB NOT NULL,

    CONSTRAINT "RuneStoneDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "stage" "JobStage" NOT NULL,
    "lvMin" INTEGER NOT NULL,
    "lvMax" INTEGER NOT NULL,
    "lvChar" INTEGER NOT NULL,
    "baseCooldown" INTEGER,
    "atkType" "AttackType" NOT NULL,
    "iconUrl" TEXT,
    "skillType" "SkillType" NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillAdvancement" (
    "id" SERIAL NOT NULL,
    "skillId" INTEGER NOT NULL,
    "requiredLevel" INTEGER NOT NULL,
    "nextSkillId" INTEGER,

    CONSTRAINT "SkillAdvancement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillEffect" (
    "id" SERIAL NOT NULL,
    "skillLevelId" INTEGER NOT NULL,
    "effectType" "EffectType" NOT NULL,
    "target" "Target",
    "attribute" "Attribute",
    "baseValue" DOUBLE PRECISION,
    "unit" "UnitType",
    "chance" DOUBLE PRECISION,
    "duration" DOUBLE PRECISION,
    "interval" DOUBLE PRECISION,
    "stackLimit" INTEGER,

    CONSTRAINT "SkillEffect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillLevel" (
    "id" SERIAL NOT NULL,
    "skillId" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    "reqCharLv" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,
    "cooldown" INTEGER NOT NULL,
    "distance" INTEGER NOT NULL,
    "range" INTEGER NOT NULL,

    CONSTRAINT "SkillLevel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StarBonus" (
    "id" SERIAL NOT NULL,
    "starLevel" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "weaponDetailId" INTEGER,
    "armorDetailId" INTEGER,
    "petEquipmentDetailId" INTEGER,

    CONSTRAINT "StarBonus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ToolDetail" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "type" "ToolType" NOT NULL,
    "cooldown" INTEGER,
    "duration" INTEGER,

    CONSTRAINT "ToolDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeaponDetail" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "weaponType" "WeaponType" NOT NULL,
    "specialEffect" TEXT,
    "attackType" "AttackType" NOT NULL,

    CONSTRAINT "WeaponDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ItemJobs" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ItemJobs_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_PetEquipmentDetailToPetEquipmentEffect" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PetEquipmentDetailToPetEquipmentEffect_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "AccessoryDetail_itemId_key" ON "AccessoryDetail"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "Area_name_key" ON "Area"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ArmorDetail_itemId_key" ON "ArmorDetail"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "ArmorSet_name_key" ON "ArmorSet"("name");

-- CreateIndex
CREATE INDEX "ArmorSetBonus_setId_idx" ON "ArmorSetBonus"("setId");

-- CreateIndex
CREATE UNIQUE INDEX "CollectionDetail_itemId_key" ON "CollectionDetail"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "CostumeDetail_itemId_key" ON "CostumeDetail"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "Creature_name_key" ON "Creature"("name");

-- CreateIndex
CREATE INDEX "Creature_name_level_idx" ON "Creature"("name", "level");

-- CreateIndex
CREATE UNIQUE INDEX "Dungeon_name_key" ON "Dungeon"("name");

-- CreateIndex
CREATE UNIQUE INDEX "DungeonMonster_monsterId_key" ON "DungeonMonster"("monsterId");

-- CreateIndex
CREATE UNIQUE INDEX "EnhancementDetail_itemId_key" ON "EnhancementDetail"("itemId");

-- CreateIndex
CREATE INDEX "Item_name_idx" ON "Item"("name");

-- CreateIndex
CREATE INDEX "Item_type_quality_idx" ON "Item"("type", "quality");

-- CreateIndex
CREATE INDEX "ItemAttribute_itemId_idx" ON "ItemAttribute"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "MaterialDetail_itemId_key" ON "MaterialDetail"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "Monster_creatureId_key" ON "Monster"("creatureId");

-- CreateIndex
CREATE UNIQUE INDEX "Nation_name_key" ON "Nation"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Pet_creatureId_key" ON "Pet"("creatureId");

-- CreateIndex
CREATE UNIQUE INDEX "PetAttribute_petId_attribute_key" ON "PetAttribute"("petId", "attribute");

-- CreateIndex
CREATE UNIQUE INDEX "PetEggDetail_itemId_key" ON "PetEggDetail"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "PetEggDetail_petId_key" ON "PetEggDetail"("petId");

-- CreateIndex
CREATE UNIQUE INDEX "PetEquipmentDetail_itemId_key" ON "PetEquipmentDetail"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "PetSkill_name_key" ON "PetSkill"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Quest_triggerItemId_key" ON "Quest"("triggerItemId");

-- CreateIndex
CREATE UNIQUE INDEX "QuestItemDetail_itemId_key" ON "QuestItemDetail"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "Race_name_key" ON "Race"("name");

-- CreateIndex
CREATE UNIQUE INDEX "RuneStoneDetail_itemId_key" ON "RuneStoneDetail"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_name_key" ON "Skill"("name");

-- CreateIndex
CREATE INDEX "Skill_name_stage_idx" ON "Skill"("name", "stage");

-- CreateIndex
CREATE UNIQUE INDEX "ToolDetail_itemId_key" ON "ToolDetail"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "WeaponDetail_itemId_key" ON "WeaponDetail"("itemId");

-- CreateIndex
CREATE INDEX "_ItemJobs_B_index" ON "_ItemJobs"("B");

-- CreateIndex
CREATE INDEX "_PetEquipmentDetailToPetEquipmentEffect_B_index" ON "_PetEquipmentDetailToPetEquipmentEffect"("B");

-- AddForeignKey
ALTER TABLE "AccessoryDetail" ADD CONSTRAINT "AccessoryDetail_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Area" ADD CONSTRAINT "Area_nationId_fkey" FOREIGN KEY ("nationId") REFERENCES "Nation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArmorDetail" ADD CONSTRAINT "ArmorDetail_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArmorDetail" ADD CONSTRAINT "ArmorDetail_setId_fkey" FOREIGN KEY ("setId") REFERENCES "ArmorSet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArmorSetBonus" ADD CONSTRAINT "ArmorSetBonus_setId_fkey" FOREIGN KEY ("setId") REFERENCES "ArmorSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionDetail" ADD CONSTRAINT "CollectionDetail_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionDetail" ADD CONSTRAINT "CollectionDetail_nationId_fkey" FOREIGN KEY ("nationId") REFERENCES "Nation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CostumeDetail" ADD CONSTRAINT "CostumeDetail_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Creature" ADD CONSTRAINT "Creature_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dungeon" ADD CONSTRAINT "Dungeon_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DungeonMonster" ADD CONSTRAINT "DungeonMonster_dungeonId_fkey" FOREIGN KEY ("dungeonId") REFERENCES "Dungeon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DungeonMonster" ADD CONSTRAINT "DungeonMonster_monsterId_fkey" FOREIGN KEY ("monsterId") REFERENCES "Monster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnhancementDetail" ADD CONSTRAINT "EnhancementDetail_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemAttribute" ADD CONSTRAINT "ItemAttribute_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemObtainMethod" ADD CONSTRAINT "ItemObtainMethod_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemObtainMethod" ADD CONSTRAINT "ItemObtainMethod_obtainMethodId_fkey" FOREIGN KEY ("obtainMethodId") REFERENCES "ObtainMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_parentJobId_fkey" FOREIGN KEY ("parentJobId") REFERENCES "Job"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobSkill" ADD CONSTRAINT "JobSkill_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobSkill" ADD CONSTRAINT "JobSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaterialDetail" ADD CONSTRAINT "MaterialDetail_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Monster" ADD CONSTRAINT "Monster_creatureId_fkey" FOREIGN KEY ("creatureId") REFERENCES "Creature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Monster" ADD CONSTRAINT "Monster_petEggId_fkey" FOREIGN KEY ("petEggId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonsterDrop" ADD CONSTRAINT "MonsterDrop_monsterId_fkey" FOREIGN KEY ("monsterId") REFERENCES "Monster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonsterDrop" ADD CONSTRAINT "MonsterDrop_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ObtainMethod" ADD CONSTRAINT "ObtainMethod_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_creatureId_fkey" FOREIGN KEY ("creatureId") REFERENCES "Creature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_petEggId_fkey" FOREIGN KEY ("petEggId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetAttribute" ADD CONSTRAINT "PetAttribute_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetEggDetail" ADD CONSTRAINT "PetEggDetail_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetEggDetail" ADD CONSTRAINT "PetEggDetail_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetEquipmentDetail" ADD CONSTRAINT "PetEquipmentDetail_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetSkillLink" ADD CONSTRAINT "PetSkillLink_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetSkillLink" ADD CONSTRAINT "PetSkillLink_petSkillId_fkey" FOREIGN KEY ("petSkillId") REFERENCES "PetSkill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quest" ADD CONSTRAINT "Quest_triggerItemId_fkey" FOREIGN KEY ("triggerItemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestItemDetail" ADD CONSTRAINT "QuestItemDetail_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestItemDetail" ADD CONSTRAINT "QuestItemDetail_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestPrerequisite" ADD CONSTRAINT "QuestPrerequisite_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestPrerequisite" ADD CONSTRAINT "QuestPrerequisite_prerequisiteId_fkey" FOREIGN KEY ("prerequisiteId") REFERENCES "Quest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestRewardItem" ADD CONSTRAINT "QuestRewardItem_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestRewardItem" ADD CONSTRAINT "QuestRewardItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RuneStoneDetail" ADD CONSTRAINT "RuneStoneDetail_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillAdvancement" ADD CONSTRAINT "SkillAdvancement_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillAdvancement" ADD CONSTRAINT "SkillAdvancement_nextSkillId_fkey" FOREIGN KEY ("nextSkillId") REFERENCES "Skill"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillEffect" ADD CONSTRAINT "SkillEffect_skillLevelId_fkey" FOREIGN KEY ("skillLevelId") REFERENCES "SkillLevel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillLevel" ADD CONSTRAINT "SkillLevel_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StarBonus" ADD CONSTRAINT "StarBonus_weaponDetailId_fkey" FOREIGN KEY ("weaponDetailId") REFERENCES "WeaponDetail"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StarBonus" ADD CONSTRAINT "StarBonus_armorDetailId_fkey" FOREIGN KEY ("armorDetailId") REFERENCES "ArmorDetail"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StarBonus" ADD CONSTRAINT "StarBonus_petEquipmentDetailId_fkey" FOREIGN KEY ("petEquipmentDetailId") REFERENCES "PetEquipmentDetail"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToolDetail" ADD CONSTRAINT "ToolDetail_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeaponDetail" ADD CONSTRAINT "WeaponDetail_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemJobs" ADD CONSTRAINT "_ItemJobs_A_fkey" FOREIGN KEY ("A") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemJobs" ADD CONSTRAINT "_ItemJobs_B_fkey" FOREIGN KEY ("B") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PetEquipmentDetailToPetEquipmentEffect" ADD CONSTRAINT "_PetEquipmentDetailToPetEquipmentEffect_A_fkey" FOREIGN KEY ("A") REFERENCES "PetEquipmentDetail"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PetEquipmentDetailToPetEquipmentEffect" ADD CONSTRAINT "_PetEquipmentDetailToPetEquipmentEffect_B_fkey" FOREIGN KEY ("B") REFERENCES "PetEquipmentEffect"("id") ON DELETE CASCADE ON UPDATE CASCADE;

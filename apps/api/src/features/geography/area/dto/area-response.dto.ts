import { Area, Nation, Dungeon, Creature, ObtainMethod } from '@glory-destiny-online-guide/prisma';
export type AreaResponseDto = Area & {
  nation: Nation;
  dungeons: Dungeon[];
  creatures: Creature[];
  obtainMethods: ObtainMethod[];
}
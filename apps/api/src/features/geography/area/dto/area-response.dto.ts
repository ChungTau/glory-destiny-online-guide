import { NationSimpleResponseDto } from '../../nation/dto/nation-response.dto';

export class AreaSimpleResponseDto {
  id: number;
  name: string;
  nationId: number;
  createdAt: Date;
  updatedAt: Date;
}

export class DungeonResponseDto {
  id: number;
  name: string;
  description?: string | null;
  requiredLevel: number;
  maxParticipants: number;
}

export class CreatureResponseDto {
  id: number;
  name: string;
  level: number;
  attackType: string;
  bodyType: string;
  description?: string | null;
}

export class ObtainMethodResponseDto {
  id: number;
  type: string;
  description?: string | null;
}

export class AreaResponseDto {
  id: number;
  name: string;
  nationId: number;
  createdAt: Date;
  updatedAt: Date;
  nation: NationSimpleResponseDto; // 加咗 nation 字段
  dungeons: DungeonResponseDto[];
  creatures: CreatureResponseDto[];
  obtainMethods: ObtainMethodResponseDto[];
}

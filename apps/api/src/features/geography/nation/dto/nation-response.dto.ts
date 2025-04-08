import { AreaSimpleResponseDto } from '../../area/dto/area-response.dto';

// 淺層 DTO，無 areas
export class NationSimpleResponseDto {
  id!: number;
  name!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

// 深層 DTO，包含 areas
export class NationResponseDto {
  id!: number;
  name!: string;
  createdAt!: Date;
  updatedAt!: Date;
  areas!: AreaSimpleResponseDto[];
}

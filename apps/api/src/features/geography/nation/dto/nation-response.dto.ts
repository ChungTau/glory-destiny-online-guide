import { Area, Nation } from '@glory-destiny-online-guide/prisma';

export type NationResponseDto = Nation & {
  areas: Area[]
}

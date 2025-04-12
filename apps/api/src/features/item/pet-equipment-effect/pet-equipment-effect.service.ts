// apps/api/src/features/item/pet-equipment-effect/pet-equipment-effect.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { RedisService } from 'src/core/redis/redis.service';

@Injectable()
export class CustomPetEquipmentEffectService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService
  ) {}
}

// apps/api/src/features/item/pet-egg-detail/pet-egg-detail.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { RedisService } from 'src/core/redis/redis.service';

@Injectable()
export class CustomPetEggDetailService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
  ) {}
}

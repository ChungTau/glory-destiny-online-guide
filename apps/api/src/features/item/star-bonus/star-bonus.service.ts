// apps/api/src/features/item/star-bonus/star-bonus.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { RedisService } from 'src/core/redis/redis.service';

@Injectable()
export class CustomStarBonusService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService
  ) {}
}

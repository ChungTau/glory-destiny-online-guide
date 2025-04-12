// apps/api/src/features/item/armor-set-bonus/armor-set-bonus.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { RedisService } from 'src/core/redis/redis.service';

@Injectable()
export class CustomArmorSetBonusService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService
  ) {}
}

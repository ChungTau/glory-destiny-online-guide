// apps/api/src/features/item/enhancement-detail/enhancement-detail.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { RedisService } from 'src/core/redis/redis.service';

@Injectable()
export class CustomEnhancementDetailService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService
  ) {}
}

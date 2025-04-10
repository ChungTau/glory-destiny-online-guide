// apps/api/src/features/item/rune-stone-detail/rune-stone-detail.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { RedisService } from 'src/core/redis/redis.service';

@Injectable()
export class CustomRuneStoneDetailService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
  ) {}
}

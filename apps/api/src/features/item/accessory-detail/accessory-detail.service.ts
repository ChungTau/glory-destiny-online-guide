// apps/api/src/features/item/accessory-detail/accessory-detail.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { RedisService } from 'src/core/redis/redis.service';

@Injectable()
export class CustomAccessoryDetailService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
  ) {}
}

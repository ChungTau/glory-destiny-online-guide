// apps/api/src/features/item/costume-detail/costume-detail.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { RedisService } from 'src/core/redis/redis.service';

@Injectable()
export class CustomCostumeDetailService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
  ) {}
}

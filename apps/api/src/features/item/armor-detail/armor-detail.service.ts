// apps/api/src/features/item/armor-detail/armor-detail.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { RedisService } from 'src/core/redis/redis.service';

@Injectable()
export class CustomArmorDetailService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService
  ) {}
}

// apps/api/src/features/item/tool-detail/tool-detail.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { RedisService } from 'src/core/redis/redis.service';

@Injectable()
export class CustomToolDetailService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService
  ) {}
}

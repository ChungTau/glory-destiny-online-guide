// apps/api/src/features/item/material-detail/material-detail.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { RedisService } from 'src/core/redis/redis.service';

@Injectable()
export class CustomMaterialDetailService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService
  ) {}
}

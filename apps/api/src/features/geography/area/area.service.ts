// apps/api/src/features/geography/area/area.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { RedisService } from 'src/core/redis/redis.service';

@Injectable()
export class CustomAreaService {
  constructor(private prisma: PrismaService, private redis: RedisService) {}

  // Custom methods
  async findAreasByNation(nationId: number) {
    return this.prisma.area.findMany({
      where: { nationId },
      include: { nation: true },
    });
  }
}
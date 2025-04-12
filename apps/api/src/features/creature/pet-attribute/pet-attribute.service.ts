// apps/api/src/features/geography/pet-attribute/pet-attribute.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { RedisService } from 'src/core/redis/redis.service';

@Injectable()
export class CustomPetAttributeService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService
  ) {}
}

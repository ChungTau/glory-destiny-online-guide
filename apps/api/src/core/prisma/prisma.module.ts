import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  providers: [PrismaService],
  exports: [PrismaService], // 確保導出 PrismaService
})
export class PrismaModule {}
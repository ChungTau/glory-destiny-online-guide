import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@glory-destiny-online-guide/prisma';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL, // 從環境變數讀取數據庫URL
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect(); // 喺模塊初始化時連繫數據庫
    console.log('Prisma Client connected to the database');
  }

  async onModuleDestroy() {
    await this.$disconnect(); // 喺模塊銷毀時斷開連繫
    console.log('Prisma Client disconnected from the database');
  }
}
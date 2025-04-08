import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { RedisService } from './core/redis/redis.service';

@Processor('example-queue')
export class ExampleProcessor {
  private readonly logger = new Logger(ExampleProcessor.name);

  constructor(private readonly redisService: RedisService) {}

  @Process('example-job')
  async handleExampleJob(job: Job<any>) {
    const { data } = job;
    this.logger.log(`處理任務: ${JSON.stringify(data)}`);

    try {
      // 使用 job.id，確保型別定義正確
      const key = `job:${job.id}`;
      await this.redisService.setJson(key, {
        status: 'processed',
        data: data.example,
        processedAt: new Date().toISOString(),
      });

      this.logger.log(`任務 ${job.id} 處理完成`);
      return { success: true, jobId: job.id };
    } catch (error) {
      // 處理 unknown 型別的 error
      if (error instanceof Error) {
        this.logger.error(`任務 ${job.id} 處理失敗`, error.stack);
        throw error;
      } else {
        this.logger.error(`任務 ${job.id} 處理失敗`, '未知錯誤');
        throw new Error('未知處理錯誤');
      }
    }
  }
}
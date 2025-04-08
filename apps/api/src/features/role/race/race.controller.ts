// apps/api/src/features/geography/race/race.controller.ts
import { Controller } from '@nestjs/common';
import { RaceService } from './race.service';
import { RaceCreateDto } from './dto/race-create.dto';
import { RaceUpdateDto } from './dto/race-update.dto';
import { Race, RaceInclude, Prisma } from '@glory-destiny-online-guide/prisma';
import { BaseController } from 'src/core/base.controller';
import { RaceResponseDto } from './dto/race-response.dto';

@Controller('races')
export class RaceController extends BaseController<
  Race,
  RaceResponseDto,
  typeof Prisma.ModelName.Race,
  RaceCreateDto,
  RaceUpdateDto,
  RaceInclude
> {
  protected readonly service: RaceService; // 只聲明類型，唔賦值

  constructor(private readonly raceService: RaceService) {
    super();
    this.service = this.raceService; // 喺 constructor 入面賦值
  }
}
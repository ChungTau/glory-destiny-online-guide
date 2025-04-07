import { Test, TestingModule } from '@nestjs/testing';
import { NationController } from './nation.controller';

describe('NationController', () => {
  let controller: NationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NationController],
    }).compile();

    controller = module.get<NationController>(NationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

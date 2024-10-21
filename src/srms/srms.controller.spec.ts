import { Test, TestingModule } from '@nestjs/testing';
import { SrmsController } from './srms.controller';

describe('SrmsController', () => {
  let controller: SrmsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SrmsController],
    }).compile();

    controller = module.get<SrmsController>(SrmsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

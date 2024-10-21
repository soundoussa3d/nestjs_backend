import { Test, TestingModule } from '@nestjs/testing';
import { SrmsService } from './srms.service';

describe('SrmsService', () => {
  let service: SrmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SrmsService],
    }).compile();

    service = module.get<SrmsService>(SrmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

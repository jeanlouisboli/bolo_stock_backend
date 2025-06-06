import { Test, TestingModule } from '@nestjs/testing';
import { TypePartenaireService } from './type-partenaire.service';

describe('TypePartenaireService', () => {
  let service: TypePartenaireService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypePartenaireService],
    }).compile();

    service = module.get<TypePartenaireService>(TypePartenaireService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

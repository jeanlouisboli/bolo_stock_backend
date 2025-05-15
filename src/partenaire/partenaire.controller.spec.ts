import { Test, TestingModule } from '@nestjs/testing';
import { PartenaireController } from './Partenaire.controller';
import { PartenaireService } from './Partenaire.service';

describe('PartenaireController', () => {
  let controller: PartenaireController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PartenaireController],
      providers: [PartenaireService],
    }).compile();

    controller = module.get<PartenaireController>(PartenaireController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

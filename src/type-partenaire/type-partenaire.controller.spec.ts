import { Test, TestingModule } from '@nestjs/testing';
import { TypePartenaireController } from './type-partenaire.controller';
import { TypePartenaireService } from './type-partenaire.service';

describe('TypePartenaireController', () => {
  let controller: TypePartenaireController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypePartenaireController],
      providers: [TypePartenaireService],
    }).compile();

    controller = module.get<TypePartenaireController>(TypePartenaireController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

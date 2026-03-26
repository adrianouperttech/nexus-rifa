import { Test, TestingModule } from '@nestjs/testing';
import { RootUsersController } from './root-users.controller';

describe('RootUsersController', () => {
  let controller: RootUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RootUsersController],
    }).compile();

    controller = module.get<RootUsersController>(RootUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

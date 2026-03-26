import { Test, TestingModule } from '@nestjs/testing';
import { RootUsersService } from './root-users.service';

describe('RootUsersService', () => {
  let service: RootUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RootUsersService],
    }).compile();

    service = module.get<RootUsersService>(RootUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

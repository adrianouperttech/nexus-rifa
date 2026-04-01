import { Test, TestingModule } from '@nestjs/testing';
import { RifasService } from './rifas.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Rifa } from './entities/rifa.entity';
import { NotFoundException } from '@nestjs/common';
import { LoggerService } from '../../common/logger/logger.service';
import { PlansService } from '../plans/plans.service';

describe('RifasService', () => {
  let service: RifasService;
  let repository: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RifasService,
        {
          provide: getRepositoryToken(Rifa),
          useFactory: () => ({
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            remove: jest.fn(),
            count: jest.fn(),
            delete: jest.fn(),
          }),
        },
        { provide: PlansService, useFactory: () => ({ findOne: jest.fn() }) },
        {
          provide: LoggerService,
          useValue: { error: jest.fn(), warn: jest.fn(), log: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<RifasService>(RifasService);
    repository = module.get(getRepositoryToken(Rifa));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a rifa', async () => {
      const createRifaDto = { titulo: 'My Rifa' };
      const tenant_id = '1';
      const createdRifa = { id: '1', ...createRifaDto, tenant_id };

      jest.spyOn(repository, 'create').mockReturnValue(createdRifa);
      jest.spyOn(repository, 'save').mockResolvedValue(createdRifa);

      const result = await service.create(tenant_id, createRifaDto as any);

      expect(repository.create).toHaveBeenCalledWith({
        ...createRifaDto,
        tenant_id,
      });
      expect(repository.save).toHaveBeenCalledWith(createdRifa);
      expect(result).toEqual(createdRifa);
    });
  });

  describe('findAll', () => {
    it('should return an array of rifas', async () => {
      const result = [{} as Rifa];
      jest.spyOn(repository, 'find').mockResolvedValue(result);
      expect(await service.findAll('1')).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a rifa', async () => {
      const result = {} as Rifa;
      jest.spyOn(repository, 'findOne').mockResolvedValue(result);
      expect(await service.findOne('1', '1')).toBe(result);
    });

    it('should throw NotFoundException if rifa not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);
      await expect(service.findOne('1', '1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a rifa', async () => {
      jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 1 });
      await service.remove('1', '1');
      expect(repository.delete).toHaveBeenCalledWith({
        id: '1',
        tenant_id: '1',
      });
    });

    it('should throw NotFoundException if rifa is not found', async () => {
      jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 0 });
      await expect(service.remove('1', '1')).rejects.toThrow(NotFoundException);
    });
  });
});
